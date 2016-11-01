#Datalegreya
###the typeface that melts text and data visualisation

![Specimen](http://figs-lab.com/content/datalegreya/readme-specimen.png)

>Datalegreya is a typeface which can interweave data curves with text. It is designed by [Figs](http://figs-lab.com), on the basis of open source font [Alegreya Sans SC Thin](https://fonts.google.com/specimen/Alegreya+Sans+SC) by type designer [Juan Pablo del Peral](https://twitter.com/juandelperal). 

>Datalegreya can be used in all contexts where small space is available to synthetically display graphical data: connected objects, embedded displays, annual reports, weather report, stock prices, etc.

>It doesn’t need any specialized software: users just have to install it in the operating system and launch any software able to display OpenType fonts, such as Microsoft Word, Apple TextEdit, Adobe Suite, etc. 

>Standards compliance makes it equally available on the web or software embedded.

>Most connected objects feature a small sized screen, and all of them are about data. By its hybrid design aimed to displaying text and data in compact spaces, Datalegreya brings a realistic and elegant solution to this ever growing market’s specific issues.


##Summary
- [**Demo**](http://figs-lab.com/datalegreya)
- [**How to install**](#how-to-install)
- [**How to use it**](#how-to-use-it)
	- [Simplest form](#simplest-form)
	- [Simple graph](#simple-graph)
	- [Neutral characters](#neutral-characters)
	- [Start value](#start-value)
	- [Min / Max indicators](#min--max-indicators)
	- [Neutral spaces](#neutral-spaces)
	- [Non neutral spaces](#non-neutral-spaces)
	- [X axis legend](#x-axis-legend)
	- [Y axis legend](#y-axis-legend)
- [**Webfont**](#webfont)
	- [`@font-face`](#font-face)
	- [`font-feature-settings` + `font-variant-ligatures`](#font-feature-settings--font-variant-ligatures)
	- [`text-rendering` + `font-smoothing`](#text-rendering--font-smoothing)
	- [Browser support](#browser-support)
- [**License**](#license)
- [**Feedback or questions?**](#feedback-or-questions)

------

##Demo
Check out our [**demo**](http://figs-lab.com/datalegreya) on our website!

##How to install

1. [**Download ZIP**](https://github.com/figs-lab/datalegreya/archive/master.zip)
2. Unzip `datalegreya-master.zip`
3. Go to `/font-files` folder and double-click on OTF files in each subfolder to install it on your computer.
4. Open you favorite design software
5. Activate the following OpenType features:
	- Ligatures
	- Discretionary Ligatures
	- Contextual Alternates
6. Enjoy!


##How to use it

To use it, one just have to insert after each letter a special character followed by a number. The font automatically replaces this simple code by the characters that will display the curve corresponding to the selected values.
Under the hood, Datalegreya makes use of OpenType advanced features: multiple substitutions grant the possibility to replace several glyphs by one unique character.


###Simplest form

Datalegreya can be used like a standard font. 
Its design is nearly the same than Alegreya Sans SC Thin.

<pre><code>bingo</code></pre>

![Datalegreya – Simplest form](http://www.figs-lab.com/datalegreya/readme-12.png)


###Simple graph

Use the following encoding to display a graph inside a word: 

`character`  +  `|` (pipe character)  +  `value`


> *Remember:*
> 
> - *only use lower case characters*
> - *only use integer values between 0 and 3*

<pre><code>b|1i|3n|2g|2o|1</code></pre>

![Datalegreya – Simple graph](http://www.figs-lab.com/datalegreya/readme-13.png)


###Neutral characters

To improve legibility of sentences, some characters won’t display the graph: 

`« » ! ? / ( ),; : *_`

<pre><code>b|1i|3n|2g|2o|1!|3</code></pre>

![Datalegreya – Neutral characters](http://www.figs-lab.com/datalegreya/readme-14.png)


###Start value

By default, the start value of the graph is 0, but user can start with another value by inserting the `§` (section) character, followed by a integer between 0 and 3.

<pre><code>§1b|1i|3n|2g|2o|1</code></pre>

![Datalegreya](http://www.figs-lab.com/datalegreya/readme-15.png)


###Min / Max indicators

The graph can be documented with indicators pointing on the minimum and / or maximum values.

Simply insert after the selected value one of the following code, enclosed into brackets:

`[-]` --> abbreviated mininum indicator

`[--]` --> mininum indicator

`[+]` --> abbreviated maxinum indicator

`[++]` --> maxinum indicator

<pre><code>b|1i|3n|2g|2o|1 \h|2o|2p|3</code></pre>

![Datalegreya – Min / Max indicators](http://www.figs-lab.com/datalegreya/readme-16.png)


###Neutral spaces

Spaces can be inserted in a graphed sentence.

To achieve precise display of the character following the space, a `\` (antislash) character must be inserted right after each space.

> *Remember:*
> 
> - *if you put more than 5 consecutive spaces or neutral characters, the following character won’t remember the value of the previous character.*

<pre><code>b|1i|3[max]n|2g|2o|1</code></pre>

![Datalegreya – Neutral spaces](http://www.figs-lab.com/datalegreya/readme-17.png)


###Non neutral spaces

But spaces can also be part of the graph. 

Use them just as normal characters:

`space` + `|` (pipe) + `value`

<pre><code>b|1i|3n|2g|2o|1 |2h|2o|2p|3</code></pre>

![Datalegreya – Non neutral spaces](http://www.figs-lab.com/datalegreya/readme-18.png)


###X axis legend

It is possible to add information about the meaning of the values on the X-axis of the graph.

Put 5 characters (no more, no less) inside `{ }` (accolades). 

Placing this code on the beginning and / or at the end of the string determine the position of the legend.

> *Remember:*
> 
> - *5 characters are needed inside the accolades. You can eventually use spaces to complete.*
> - *spaces are allowed, as well as lower-case letters, digits, `-` (minus), `/` (slash) and `°` (degree) characters.*
> - *accented characters are not supported.*

<pre><code>{24/04}b|1i|3n|2g|2o|1{31/08}</code></pre>

![Datalegreya – X-axis legend](http://www.figs-lab.com/datalegreya/readme-19.png)


###Y axis legend

User can also add legend about the Y-axis of the graph. Here is the code to achieve that:

Between `[ ]` (brackets), put 5 characters (the top value legend) followed by a separator `[` (left bracket) or `]` (right bracket), then again 5 characters (the bottom value legend). 

> *Remember:*
> 
> - *available characters are lower-case letters, digits, `-` (minus), `/` (slash) and `°` (degree) characters.*
> - *accented characters are not supported.*
> - *each side of the central bracket must contain 5 characters, no more, no less.*

<pre><code>b|1i|3n|2g|2o|1[50   \[0    \]</code></pre>

![Datalegreya – Y-axis legend](http://www.figs-lab.com/datalegreya/readme-20.png)


##Webfont

###@font-face
To use it on the web, simply load the OTF file in your CSS using the `@font-face` rule:

```css
@font-face {
	font-family: 'Datalegreya-Thin';
	src: url('[path/to/your/fonts/folder]/Datalegreya-Thin.otf');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Datalegreya-Gradient';
	src: url('[path/to/your/fonts/folder]/Datalegreya-Gradient.otf');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Datalegreya-Dot';
	src: url('[path/to/your/fonts/folder]/Datalegreya-Dot.otf');
	font-weight: normal;
	font-style: normal;
}
```

###`font-feature-settings` + `font-variant-ligatures`
To display the font properly, you must enable `kern` (kerning), `liga` (ligatures) and `calt` (contextual alternates) features by adding the following code to your CSS file:

```css
body {
	-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;
	-moz-font-feature-settings: "kern" on, "liga" on, "calt" on;
	-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;
	-ms-font-feature-settings: "kern" on, "liga" on, "calt" on;
	font-feature-settings: "kern" on, "liga" on, "calt" on;
	font-variant-ligatures: common-ligatures discretionary-ligatures contextual;
}
```

###`text-rendering` + `font-smoothing`
To optimize font rendering, you can also use `text-rendering` and `font-smoothing` properties as following:

```css
body {
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

###Browser support
Browser | CSS [OTF](http://caniuse.com/#feat=ttf) + [font-feature-settings](http://caniuse.com/#search=feature-settings) support
---------------------------| ------------------
IE 9                       | ✗ No
IE 10+                     | ~ Partial
Edge 12+                   | ✓ Yes
Firefox 34+                | ✓ Yes
Chrome 48+                 | ✓ Yes
Opera 35+                  | ✓ Yes
Safari 9.1+                | ✓ Yes
iOS Safari 4.3+            | ✓ Yes
Opera Mini                 | ✗ No
Opera Mobile 37+           | ✓ Yes
Android Browser 52+        | ✓ Yes
Blackberry Browser 10+     | ✓ Yes
Chrome for Android 53+     | ✓ Yes
Firefox for Android 49+    | ✓ Yes
IE Mobile                  | ✗ No



##License
This font is licensed under the [SIL Open Font License (OFL), Version 1.1](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)


##Feedback or questions?
Feel free to contact us at <contact@figs-lab.com>
HIGHLIGHTS BY 0