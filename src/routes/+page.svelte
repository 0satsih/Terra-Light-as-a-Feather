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

	
</script>

