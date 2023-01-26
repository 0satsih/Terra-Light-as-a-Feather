<script>
	import { Tabs, TabItem } from 'flowbite-svelte';
</script>

<div id="Preamble" class="mx-4">
	<Tabs style="underline" contentClass="pt-4 mt-4 mx-2">
		<TabItem open title="Preamble">
			<p class="">
				On the 14th of January, Terra announce the launch of Station, a wallet that streamlines the
				experience of interacting with multiple blockchain networks by simplifying the often complex
				and cumbersome process. It allows users to easily perform actions such as staking, voting,
				sending and receiving tokens, and interacting with their preferred dApps across all
				supported chains.
				<br />
				<br />
				More information about the wallet can be found in the associated article
				<a
					href="https://medium.com/terra-money/introducing-station-abd478aa4059"
					class="text-blue-600 hover:text-blue-400">here.</a
				>
				<br />
				<br />
				It is clear that the launch of Station has generated some hype on the socials, but did it translate
				into more on-chain activity?<br /> This analysis aims to discover whether the launch of Station
				has had any measurable impact on activity in the Terra ecosystem, or whether there are other
				factors at play.
			</p>
		</TabItem>
		<TabItem title="Methodolgy">
			<p class="">This analysis focuses on a curation of key metrics:</p>

			<ul class="list-disc ml-8 mt-2">
				<li>Price</li>
				<li>Number of transactions</li>
				<li>Number of new users</li>
				<li>Number of active users</li>
				<li>Number of stakers</li>
				<li>Volume staked</li>
			</ul>
			<p>
				<br />These metrics will be displayed over the time period between Jan 07 - Jan 21, which is
				a week before and after the launch of Station. The launch date will be represented by a red
				line on each of the charts.
			</p>
		</TabItem>
	</Tabs>
</div>
