# Space CLI

CLI for space information

## Requirements:  
[Node](https://nodejs.org/en/)  
[npm](https://docs.npmjs.com/getting-started/installing-node) (installed with Node by default)  

## Installation  
```
npm install -g space-cli
```

## Usage  
```
space <command> [options]
```

**Example commands:**  
`space launch` - shows id, launch name, time (scheduled attempted) and available live stream options for the next rocket launch  
`space launch -v --tz Asia/Shanghai -n 5` - shows id, launch name, time (scheduled attempted) converted to CST time zone, name of a rocket, and missions (with type and description) for the next 5 launches  
`space news` - shows news articles (source, title and link) from current and previous day, grouped by date

## Settings  
Settings allow you to store preferred values (e.g. time zone), which will be automatically used with a command unless other value is provided (in-command values are prioritized over settings).  
Settings file (`settings.json`) can be found in `spacecli`, placed in system's respective config directory (set with `XDG_CONFIG_HOME`, or `~/.config` for *nix and `~/AppData/Local/` for win)

**Example commands:**  
`space settings --tz Asia/Shanghai` - save Asia/Shanghai as preferred time zone  
`space launch --tz` - Command will automatically use Asia/Shanghai for time conversion, unless different time zone is specified

Space CLI is in active development, to see currently available commands and options, use `space -h`.
