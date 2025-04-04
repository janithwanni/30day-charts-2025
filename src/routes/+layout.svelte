<script>
	import '../app.css';

	let { children } = $props();
</script>

<nav class="font-winky text-lg">
  <ul>
    <li><a href="/day1">Day 1</a></li>
    <li><a href="/day2">Day 2</a></li>
    <li><a href="https://github.com/janithwanni/30days-charts-2025/">Github</a></li>
  </ul>
</nav>
{@render children()}

<style>
nav {
    border-bottom: 1px solid black;
}

nav ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }

nav ul li {
    display: inline-block;
  }

nav ul li:last-child {
  margin-left: auto;
  padding-right: 1rem;
  }
</style>
