# pagShrink
jquery plugin for Bootstrap 4: auto shrinks pagination (responsive)

## usage

make sure by CSS that all anchor `<a>` items benath `<li>` have same dimensions of `width`and `height`.

_example css_
~~~css
.page-link {
	min-width: 48px !important;
	width: 48px !important;
	height: 35px;
	text-align: center;
	float: left;
}
~~~

_activate_

~~~js
$('.pagination').pagShrink();
~~~

_html_

~~~html
<ul class="pagination">
	...
	<li class="page-item">
		<a class="page-link" href="#">
			whatever...
		</a>
	</li>
	...
</ul>
~~~
