import { Flipside } from '@flipsidecrypto/sdk/dist/src';
import type { QueryResultSet, Query } from '@flipsidecrypto/sdk/dist/src';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const flipside = new Flipside("1f5ac839-b5bd-404a-93ff-8f06f84e3a49", 'https://node-api.flipsidecrypto.com');

	const daily_transactions: Query = {
		sql: `
        SELECT
  date_trunc('day', block_timestamp) as date,
  count(distinct tx_id) as transactions
FROM
  terra.core.fact_transactions
GROUP BY
  date
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY 1 DESC
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};
	const daily_new_users: Query = {
		sql: `
        with
  users_first as (
    SELECT
      tx_sender as user,
      min(block_timestamp) as first_transaction
    FROM
      terra.core.fact_transactions
    GROUP BY
      1
  )
SELECT
  date_trunc('day', first_transaction) as date,
  count(user) as users
FROM
  users_first
GROUP BY
  date
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY 1 DESC
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};
	const daily_active_users: Query = {
		sql: `
        SELECT
  date_trunc('day', block_timestamp) as date,
  count(distinct tx_sender) as users
FROM
  terra.core.fact_transactions
GROUP BY
  date
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY 1 DESC
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};
	const daily_stakers: Query = {
		sql: `
        SELECT
  action,
  date_trunc('day', block_timestamp) as date,
  count(distinct delegator_address) as stakers
FROM
  terra.core.ez_staking
GROUP BY
  1,
  2
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY
  2 DESC
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};
	const daily_staked: Query = {
		sql: `
        with
  daily_terra_prices as (
    SELECT
      date_trunc('day', recorded_hour) as date,
      avg(close) as price_usd
    FROM
      crosschain.core.fact_hourly_prices
    WHERE
      id = 'terra-luna-2'
    GROUP BY
      1
  ),
  daily_staked as (
    SELECT
      action,
      date_trunc('day', block_timestamp) as date,
      count(*) as stakes,
      sum(amount) as staked
    FROM
      terra.core.ez_staking
    GROUP BY
      1,
      2
  )
SELECT
  action,
  a.date,
  stakes,
  round(staked, 2) as staked,
  round(staked * price_usd, 2) as staked_usd
FROM
  daily_staked a
  INNER JOIN daily_terra_prices b ON a.date = b.date
WHERE
  a.date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY
  2 DESC
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};
	const daily_price: Query = {
		sql: `
        SELECT
  date_trunc('day', recorded_hour) as date,
  avg(close) as price_usd
FROM
  crosschain.core.fact_hourly_prices
WHERE
  id = 'terra-luna-2'
GROUP BY
  1
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY
  1
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};


	// Construct an array of flipside Query objects.
	const queries = [
		daily_transactions,
		daily_new_users,
		daily_active_users,
		daily_stakers,
		daily_staked,
		daily_price
	];

	// Map over array of queries, process & return an array of results.
	const results = queries.map(async function (query) {
		const result: QueryResultSet = await flipside.query.run(query);
		return JSON.parse(JSON.stringify(result?.records));
	});

	// Construct object of results of different queries.
	const data = {
		daily_transactions: results[0],
		daily_new_users: results[1],
		daily_active_users: results[2],
		daily_stakers: results[3],
		daily_staked: results[4],
		daily_price: results[5]
	};

	if (!results) {
		throw error(404, 'Not found');
	} else {
		return data;
	}
}) satisfies PageServerLoad;
