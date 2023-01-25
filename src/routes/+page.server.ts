import { Flipside } from '@flipsidecrypto/sdk/dist/src';
import type { QueryResultSet, Query } from '@flipsidecrypto/sdk/dist/src';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { FLIPSIDE_KEY } from '$env/static/private';

export const load = (async () => {
	const flipside = new Flipside(FLIPSIDE_KEY, 'https://node-api.flipsidecrypto.com');

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

	// Construct an array of flipside Query objects.
	const queries = [daily_transactions, daily_new_users, daily_active_users];

	// Map over array of queries, process & return an array of results.
	const results = queries.map(async function (query) {
		const result: QueryResultSet = await flipside.query.run(query);
		return JSON.parse(JSON.stringify(result?.records));
	});

	// Construct object of results of different queries.
	const data = {
		daily_transactions: results[0],
		daily_new_users: results[1],
		daily_active_users: results[2]
	};

	if (!results) {
		throw error(404, 'Not found');
	} else {
		return data;
	}
}) satisfies PageServerLoad;
