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
`space next` - shows id, launch name, time (scheduled attempted) and available live stream options for the next rocket launch  
`space next -v --tz Asia/Shanghai -n 5` - shows id, launch name, time (scheduled attempted) converted to CST time zone, name of a rocket, and missions (with type and description) for the next 5 launches

## Settings  
Settings allow you to store preferred values (e.g. time zone) which will be automatically used during [empty] option call. Settings can be found in `<user_dir>/.spacecli` dir.

**Example commands:**  
`space settings --tz Asia/Shanghai` - save Asia/Shanghai as preferred time zone  
`space next --tz` - Command will automatically use Asia/Shanghai for time convertion, unless different time zone is specified

Space CLI is in active development, to see currently available commands and options, use `space -h`.
