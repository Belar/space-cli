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
`space next` - show id, name and time (scheduled attempted) of the next rocket launch  
`space next -d -tz Asia/Shanghai` - show id, name, time (scheduled attempted) converted to CST time zone, available live stream options and name of the rocket

Space CLI is in active development, to see currently available commands and options, use `space -h`.
