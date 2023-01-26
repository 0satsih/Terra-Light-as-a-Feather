<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import annotationPlugin from 'chartjs-plugin-annotation';

	Chart.register(annotationPlugin);

	export let xdata: any;
	export let ydata: any;
	export let ydata2: any;
	export let ydata3: any;

	let canvas: any;
	const data = {
		datasets: [
			{
				data: ydata,
				label: 'Delegate',
				backgroundColor: ['#003F5C'],
				borderRadius: 5
			},
			{
				data: ydata2,
				label: 'Undelegate',
				backgroundColor: ['#FFA600'],
				borderRadius: 5
			},
			{
				data: ydata3,
				label: 'Redelegate',
				backgroundColor: ['#665191'],
				borderRadius: 5
			}
		]
	};
	onMount(() => {
		const ctx = canvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				maintainAspectRatio: false,
				scales: {
					x: {
						border: {
							display: true,
							color: 'black',
							width: 1
						},
						grid: {
							display: false
						},
						reverse: true
					},
					y: {
						title: {
							display: true,
							text: 'Number of Stakers',
							font: {
								size: 15,
								family: "'Roboto', sans-serif",
								
							},
							color: 'black',
							padding: 10
						},
						border: {
							display: true,
							color: 'black',
							width: 1
						}
					}
				},
				responsive: true,
				plugins: {
					legend: {
						display: true,
						position: 'right',
						align: 'start',
						labels: {
							usePointStyle: true,
							pointStyle: 'circle'
						}
					},
					annotation: {
						annotations: {
							line1: {
								display: true,
								type: 'line',
								borderColor: 'red',
								borderWidth: 2,
								xMin: 'Jan 14',
								xMax: 'Jan 14'
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} />
