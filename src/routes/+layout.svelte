<script>
	import '../app.css';

	let { children } = $props();
</script>

<nav>
  <ul>
    <li><a href="/day1">Day 1</a></li>
    <li><a href="/day2">Day 2</a></li>
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
  }

nav ul li {
    display: inline-block;
  }
</style>
