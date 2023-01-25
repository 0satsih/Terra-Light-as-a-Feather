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
		daily_active_users: { xdata: [], ydata: [] }
	};

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
</script>

{#if view == 'Go to Dashboard View'}
	<body class="w-full">
		<div class="grid grid-cols-4">
			<header class="col-start-2 col-span-2 mx-16">
				<button on:click={handleClick}>{view}</button>
				<Header />
				<Introduction />
			</header>
			<main class="col-start-2 col-span-2">
				<div class="static my-16 mx-6 2xl:mx-24 flex items-center justify-center">
					<div class="grid grid-cols-1 gap-2">
						<div class="col-span-1 pt-5" id="DailyTransactions">
							<Chart
								title={'Daily Transactions'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
							>
								<div class="h-96" slot="figure" />
							</Chart>
						</div>
						<DailyTransactionsLanguage />
						<div class="col-span-1 pt-5" id="DailyNewUsers">
							<Chart
								title={'Daily New Users'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
							>
								<div class="h-96" slot="figure" />
							</Chart>
						</div>
						<DailyTransactionsLanguage />
						<div class="col-span-1 pt-5" id="DailyActiveUsers">
							<Chart
								title={'Daily Active Users'}
								query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
							>
								<div class="h-96" slot="figure" />
							</Chart>
						</div>
						<DailyTransactionsLanguage />
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
		<div class="static my-16 mx-6 2xl:mx-24 flex items-center justify-center">
			<button on:click={handleClick}>{view}</button>
			<div class="grid grid-cols-3 gap-2">
				<div class="col-span-1 pt-5" id="DailyTransactions">
					<Chart
						title={'Daily Transactions'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
					>
						<div class="h-96" slot="figure">
							
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5" id="DailyNewUsers">
					<Chart
						title={'Daily New Users'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
					>
						<div class="h-96" slot="figure">
							
						</div>
					</Chart>
				</div>
				<div class="col-span-1 pt-5" id="DailyActiveUsers">
					<Chart
						title={'Daily Active Users'}
						query_link={'https://next.flipsidecrypto.xyz/edit/queries/e40b8d4b-5f39-42e0-ae0a-ad809f4c931f'}
					>
						<div class="h-96" slot="figure">
							
						</div>
					</Chart>
				</div>
			</div>
		</div>
	</main>
{/if}
