<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { transform_date } from '$lib/charts/data/date_transforming';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Chart from '$lib/charts/layout/Chart.svelte';
	import DailyTransactions from '$lib/charts/DailyTransactions.svelte';
	import DailyTransactionsLanguage from '$lib/charts/language/DailyTransactionsLanguage.svelte';
	import DailyNewUsers from '$lib/charts/DailyNewUsers.svelte';
	import TableOfContents from '$lib/layout/TableOfContents.svelte';
	import Introduction from '$lib/layout/Introduction.svelte';
	import DailyPrice from '$lib/charts/DailyPrice.svelte';
	import DailyActiveUsers from '$lib/charts/DailyActiveUsers.svelte';
	import DailyStakers from '$lib/charts/DailyStakers.svelte';
	import DailyStaked from '$lib/charts/DailyStakedd.svelte';
	import DailyPriceLanguage from '$lib/charts/language/DailyPriceLanguage.svelte';
	import DailyNewUsersLanguage from '$lib/charts/language/DailyNewUsersLanguage.svelte';
	import DailyActiveUsersLanguage from '$lib/charts/language/DailyActiveUsersLanguage.svelte';
	import DailyStakersLanguage from '$lib/charts/language/DailyStakersLanguage.svelte';
	import DailyStakesLanguage from '$lib/charts/language/DailyStakesLanguage.svelte';
	import DailyStakedLanguage from '$lib/charts/language/DailyStakedLanguage.svelte';
	import DailyStakedUsdLanguage from '$lib/charts/language/DailyStakedUSDLanguage.svelte';
	import Conclusion from '$lib/charts/language/Conclusion.svelte';

	let view: string = 'Go to Dashboard View';

	function handleClick() {
		if (view == 'Go to Dashboard View') {
			view = 'Go to Report View';
		} else {
			view = 'Go to Dashboard View';
		}
	}

	export let data: PageData;

	const dataObj = {
		daily_transactions: { xdata: [], ydata: [] },
		daily_new_users: { xdata: [], ydata: [] },
		daily_active_users: { xdata: [], ydata: [] },
		daily_stakers: { xdata: [], ydata: [], ydata2: [], ydata3: [] },
		daily_staked: { xdata: [], ydata: [], ydata2: [], ydata3: [] },
		daily_staked2: { xdata: [], ydata: [], ydata2: [], ydata3: [] },
		daily_staked3: { xdata: [], ydata: [], ydata2: [], ydata3: [] },
		daily_price: { xdata: [], ydata: [] }
	};

	// Price
	dataObj.daily_price.xdata = data.daily_price.map((e: any) => transform_date(e.date));
	dataObj.daily_price.ydata = data.daily_price.map((e: any) => e.price_usd);

	// Daily Transactions
	dataObj.daily_transactions.xdata = data.daily_transactions.map((e: any) =>
		transform_date(e.date)
	);
	dataObj.daily_transactions.ydata = data.daily_transactions.map((e: any) => e.transactions);

	// Daily New Users
	dataObj.daily_new_users.xdata = data.daily_new_users.map((e: any) => transform_date(e.date));
	dataObj.daily_new_users.ydata = data.daily_new_users.map((e: any) => e.users);

	// Daily Active Users
	dataObj.daily_active_users.xdata = data.daily_active_users.map((e: any) =>
		transform_date(e.date)
	);
	dataObj.daily_active_users.ydata = data.daily_active_users.map((e: any) => e.users);

	// Daily Stakers
	dataObj.daily_stakers.xdata = data.daily_stakers.map((e: any) => transform_date(e.date));

	dataObj.daily_stakers.ydata = data.daily_stakers.map(function (e: any) {
		if (e.action == 'Delegate') {
			return { x: transform_date(e.date), y: e.stakers };
		}
	});
	dataObj.daily_stakers.ydata2 = data.daily_stakers.map(function (e: any) {
		if (e.action == 'Undelegate') {
			return { x: transform_date(e.date), y: e.stakers };
		}
	});
	dataObj.daily_stakers.ydata3 = data.daily_stakers.map(function (e: any) {
		if (e.action == 'Redelegate') {
			return { x: transform_date(e.date), y: e.stakers };
		}
	});
	dataObj.daily_stakers.xdata = dataObj.daily_stakers.xdata.filter((e) => {
		return e;
	});
	dataObj.daily_stakers.ydata = dataObj.daily_stakers.ydata.filter((e) => {
		return e;
	});
	dataObj.daily_stakers.ydata2 = dataObj.daily_stakers.ydata2.filter((e) => {
		return e;
	});
	dataObj.daily_stakers.ydata3 = dataObj.daily_stakers.ydata3.filter((e) => {
		return e;
	});

	// Daily Staked
	dataObj.daily_staked.xdata = data.daily_staked.map((e: any) => transform_date(e.date));

	dataObj.daily_staked.ydata = data.daily_staked.map(function (e: any) {
		if (e.action == 'Delegate') {
			return { x: transform_date(e.date), y: e.stakes };
		}
	});
	dataObj.daily_staked.ydata2 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Undelegate') {
			return { x: transform_date(e.date), y: e.stakes };
		}
	});
	dataObj.daily_staked.ydata3 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Redelegate') {
			return { x: transform_date(e.date), y: e.stakes };
		}
	});
	dataObj.daily_staked.xdata = dataObj.daily_staked.xdata.filter((e) => {
		return e;
	});
	dataObj.daily_staked.ydata = dataObj.daily_staked.ydata.filter((e) => {
		return e;
	});
	dataObj.daily_staked.ydata2 = dataObj.daily_staked.ydata2.filter((e) => {
		return e;
	});
	dataObj.daily_staked.ydata3 = dataObj.daily_staked.ydata3.filter((e) => {
		return e;
	});

	// Daily staked2
	dataObj.daily_staked2.xdata = data.daily_staked.map((e: any) => transform_date(e.date));

	dataObj.daily_staked2.ydata = data.daily_staked.map(function (e: any) {
		if (e.action == 'Delegate') {
			return { x: transform_date(e.date), y: e.staked };
		}
	});
	dataObj.daily_staked2.ydata2 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Undelegate') {
			return { x: transform_date(e.date), y: e.staked };
		}
	});
	dataObj.daily_staked2.ydata3 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Redelegate') {
			return { x: transform_date(e.date), y: e.staked };
		}
	});
	dataObj.daily_staked2.xdata = dataObj.daily_staked2.xdata.filter((e) => {
		return e;
	});
	dataObj.daily_staked2.ydata = dataObj.daily_staked2.ydata.filter((e) => {
		return e;
	});
	dataObj.daily_staked2.ydata2 = dataObj.daily_staked2.ydata2.filter((e) => {
		return e;
	});
	dataObj.daily_staked2.ydata3 = dataObj.daily_staked2.ydata3.filter((e) => {
		return e;
	});

	// Daily staked3
	dataObj.daily_staked3.xdata = data.daily_staked.map((e: any) => transform_date(e.date));

	dataObj.daily_staked3.ydata = data.daily_staked.map(function (e: any) {
		if (e.action == 'Delegate') {
			return { x: transform_date(e.date), y: e.staked_usd };
		}
	});
	dataObj.daily_staked3.ydata2 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Undelegate') {
			return { x: transform_date(e.date), y: e.staked_usd };
		}
	});
	dataObj.daily_staked3.ydata3 = data.daily_staked.map(function (e: any) {
		if (e.action == 'Redelegate') {
			return { x: transform_date(e.date), y: e.staked_usd };
		}
	});
	dataObj.daily_staked3.xdata = dataObj.daily_staked3.xdata.filter((e) => {
		return e;
	});
	dataObj.daily_staked3.ydata = dataObj.daily_staked3.ydata.filter((e) => {
		return e;
	});
	dataObj.daily_staked3.ydata2 = dataObj.daily_staked3.ydata2.filter((e) => {
		return e;
	});
	dataObj.daily_staked3.ydata3 = dataObj.daily_staked3.ydata3.filter((e) => {
		return e;
	});
</script>

{#if view == 'Go to Dashboard View'}
	<body class="w-full">
		<div class="grid grid-cols-4">
			<header class="col-start-2 col-span-2 mx-16">
				<Header>
					<button
						slot="view"
						class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
						 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-8 mt-28 mb-2 
						   
						 "
						on:click={handleClick}>{view}</button
					>
				</Header>
				<Introduction />
			</header>
			<main class="col-start-2 col-span-2">
				<div class="static my-16 mx-6 2xl:mx-24 flex items-center justify-center">
					<div class="grid grid-cols-1 gap-2">
						<div class="col-span-1 pt-5" id="Price">
							<Chart
								title={'Luna Price'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/2e2f5c7d-e03b-4ba0-9502-faad1c37c362'}
							>
								<div class="h-96" slot="figure">
									<DailyPrice xdata={dataObj.daily_price.xdata} ydata={dataObj.daily_price.ydata} />
								</div>
							</Chart>
						</div>
						<DailyPriceLanguage />
						<div class="col-span-1 pt-5" id="DailyTransactions">
							<Chart
								title={'Daily Transactions'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
							>
								<div class="h-96" slot="figure">
									<DailyTransactions
										xdata={dataObj.daily_transactions.xdata}
										ydata={dataObj.daily_transactions.ydata}
									/>
								</div>
							</Chart>
						</div>
						<DailyTransactionsLanguage />
						<div class="col-span-1 pt-5" id="DailyNewUsers">
							<Chart
								title={'Daily New Users'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/d95730c4-7017-4801-9249-6c9187ce53d5'}
							>
								<div class="h-96" slot="figure">
									<DailyNewUsers
										xdata={dataObj.daily_new_users.xdata}
										ydata={dataObj.daily_new_users.ydata}
									/>
								</div>
							</Chart>
						</div>
						<DailyNewUsersLanguage />
						<div class="col-span-1 pt-5" id="DailyActiveUsers">
							<Chart
								title={'Daily Active Users'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/ce185782-79fc-4368-9ebc-311cba78f56a'}
							>
								<div class="h-96" slot="figure">
									<DailyActiveUsers
										xdata={dataObj.daily_active_users.xdata}
										ydata={dataObj.daily_active_users.ydata}
									/>
								</div>
							</Chart>
						</div>
						<DailyActiveUsersLanguage />
						<div class="col-span-1 pt-5" id="DailyStakers">
							<Chart
								title={'Daily Stakers'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/1bd104e4-46e7-4f16-b652-8b61f12658dc'}
							>
								<div class="h-96" slot="figure">
									<DailyStakers
										xdata={dataObj.daily_stakers.xdata}
										ydata={dataObj.daily_stakers.ydata}
										ydata2={dataObj.daily_stakers.ydata2}
										ydata3={dataObj.daily_stakers.ydata3}
									/>
								</div>
							</Chart>
						</div>
						<DailyStakersLanguage />
						<div class="col-span-1 pt-5" id="DailyStakes">
							<Chart
								title={'Daily Stakes'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
							>
								<div class="h-96" slot="figure">
									<DailyStaked
										xdata={dataObj.daily_staked.xdata}
										ydata={dataObj.daily_staked.ydata}
										ydata2={dataObj.daily_staked.ydata2}
										ydata3={dataObj.daily_staked.ydata3}
									/>
								</div>
							</Chart>
						</div>
						<DailyStakesLanguage />
						<div class="col-span-1 pt-5" id="DailyStaked">
							<Chart
								title={'Daily Staked'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
							>
								<div class="h-96" slot="figure">
									<DailyStaked
										xdata={dataObj.daily_staked2.xdata}
										ydata={dataObj.daily_staked2.ydata}
										ydata2={dataObj.daily_staked2.ydata2}
										ydata3={dataObj.daily_staked2.ydata3}
									/>
								</div>
							</Chart>
						</div>
						<DailyStakedLanguage />
						<div class="col-span-1 pt-5" id="DailyStakedUSD">
							<Chart
								title={'Daily Staked (USD)'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
							>
								<div class="h-96" slot="figure">
									<DailyStaked
										xdata={dataObj.daily_staked3.xdata}
										ydata={dataObj.daily_staked3.ydata}
										ydata2={dataObj.daily_staked3.ydata2}
										ydata3={dataObj.daily_staked3.ydata3}
									/>
								</div>
							</Chart>
						</div>
						<DailyStakedUsdLanguage />
						<Conclusion />
					</div>
				</div>
			</main>

			<TableOfContents />
		</div>
		<footer>
			<Footer />
		</footer>
	</body>
{/if}

{#if view == 'Go to Report View'}
	<main>
		<div class="flex justify-center items-start">
			<button
				class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
						 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-8
						   
						 "
				on:click={handleClick}>{view}</button
			>
		</div>
		<div class="static my-8 mx-6 2xl:mx-24 flex items-center justify-center">
			<div class="grid grid-cols-3 gap-2">
				<div class="col-span-1 pt-5">
					<Chart
						title={'Luna Price'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/2e2f5c7d-e03b-4ba0-9502-faad1c37c362'}
					>
						<div class="h-96" slot="figure">
							<DailyPrice xdata={dataObj.daily_price.xdata} ydata={dataObj.daily_price.ydata} />
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Transactions'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
					>
						<div class="h-96" slot="figure">
							<DailyTransactions
								xdata={dataObj.daily_transactions.xdata}
								ydata={dataObj.daily_transactions.ydata}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily New Users'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/d95730c4-7017-4801-9249-6c9187ce53d5'}
					>
						<div class="h-96" slot="figure">
							<DailyNewUsers
								xdata={dataObj.daily_new_users.xdata}
								ydata={dataObj.daily_new_users.ydata}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Active Users'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/ce185782-79fc-4368-9ebc-311cba78f56a'}
					>
						<div class="h-96" slot="figure">
							<DailyActiveUsers
								xdata={dataObj.daily_active_users.xdata}
								ydata={dataObj.daily_active_users.ydata}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Stakers'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/1bd104e4-46e7-4f16-b652-8b61f12658dc'}
					>
						<div class="h-96" slot="figure">
							<DailyStakers
								xdata={dataObj.daily_stakers.xdata}
								ydata={dataObj.daily_stakers.ydata}
								ydata2={dataObj.daily_stakers.ydata2}
								ydata3={dataObj.daily_stakers.ydata3}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Stakes'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
					>
						<div class="h-96" slot="figure">
							<DailyStaked
								xdata={dataObj.daily_staked.xdata}
								ydata={dataObj.daily_staked.ydata}
								ydata2={dataObj.daily_staked.ydata2}
								ydata3={dataObj.daily_staked.ydata3}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Staked'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
					>
						<div class="h-96" slot="figure">
							<DailyStaked
								xdata={dataObj.daily_staked2.xdata}
								ydata={dataObj.daily_staked2.ydata}
								ydata2={dataObj.daily_staked2.ydata2}
								ydata3={dataObj.daily_staked2.ydata3}
							/>
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5">
					<Chart
						title={'Daily Staked (USD)'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/d561c8b0-cdf8-4e85-92f1-efd40934bbc8'}
					>
						<div class="h-96" slot="figure">
							<DailyStaked
								xdata={dataObj.daily_staked3.xdata}
								ydata={dataObj.daily_staked3.ydata}
								ydata2={dataObj.daily_staked3.ydata2}
								ydata3={dataObj.daily_staked3.ydata3}
							/>
						</div>
					</Chart>
				</div>
			</div>
		</div>
	</main>
{/if}
