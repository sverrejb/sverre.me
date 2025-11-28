+++
title="Claude Code integration in Helix using Tmux"
+++

I am still trying out Helix as my primary editor on a daily basis. I have also started to try out Claude Code's CLI. I wanted a quick way to use Claude from within Helix, and to be able to point it to the currently open file or selected code. So I made a small script leveraging tmux that lets me do exactly that with `Space + i`.

## The setup

A bash script at `~/.local/bin/helix-claude-tmux.sh`:

```bash
#!/bin/bash
FILEPATH="$1"
SELECTION_START="$2"
SELECTION_END="$3"

# Try to find git root, otherwise use current directory
WORKDIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)

if [[ -n "$SELECTION_START" && -n "$SELECTION_END" && "$SELECTION_START" != "$SELECTION_END" ]]; then
    tmux command-prompt -p "Claude prompt:" \
        "split-pane -h -c '$WORKDIR' \"claude '%1 @$FILEPATH on lines $SELECTION_START to $SELECTION_END'\""
else
    tmux command-prompt -p "Claude prompt:" \
        "split-pane -h -c '$WORKDIR' \"claude '%1 @$FILEPATH'\""
fi
```

And two identical keybindings in `~/.config/helix/config.toml`:

```toml
[keys.normal.space]
i = ":sh helix-claude-tmux.sh %{buffer_name} %{selection_line_start} %{selection_line_end}"i

[keys.select.space]
i = ":sh helix-claude-tmux.sh %{buffer_name} %{selection_line_start} %{selection_line_end}"i
```

Pretty straightforward. If any text is selected, the line range is passed to Claude, else just the prompt and the filepath is used. The script opens Claude in a horizontal tmux split pane with a prompt and the context. The pane is closed when I exit Claude.
