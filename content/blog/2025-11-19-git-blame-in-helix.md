+++
title="Pretty printed \"git blame\" in Helix"
+++

So I have recently started to try out [Helix](https://helix-editor.com/). I have a used Vim (and Neovim) a little bit, but never actually tried to use it in any meaningful capacity. Helix is a modern alternative that has more sane defaults and should pretty much work out of the box, not requireing a bunch of config and plugins. So far I have been happy with what it offers, but there was one thing I missed from VSCode.

Sometimes it is useful to see who last commited on a line, and more importantly, the commit message. This is currently not supported out of the box in Helix. Taking inspiration from the [documentation](https://docs.helix-editor.com/command-line.html#expansions), I banged my head against the wall until i ended up with this beauty:

```bash
[keys.normal.space]
B = ":echo %sh{commit=$(git blame -L %{cursor_line},%{cursor_line} --porcelain %{buffer_name} | sed -n '1s/ .*//p'); info=$(git show -s --format='%%an|%%s|%%ad' --date=format:'%%d. %%b %%Y' \"$commit\"); IFS='|' read -r name msg date <<<\"$info\"; printf '%%s - %%s - %%s' \"$name\" \"$msg\" \"$date\"}"
```

See it in action here: (notice the status line change to a commit message at the end).

<div id="demo"><noscript>
    <p>This terminal recording requires JavaScript to function properly.</p>
</noscript></div>

<script>
    AsciinemaPlayer.create('/casts/gitblame.cast', document.getElementById('demo'), {startAt:2, theme: 'dracula'});
</script>