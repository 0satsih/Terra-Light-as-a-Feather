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

