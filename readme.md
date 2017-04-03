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
`space next -d --tz Asia/Shanghai --lt 5` - shows id, launch name, time (scheduled attempted) converted to CST time zone, name of a rocket, and missions (with type and description) for the next 5 launches

Space CLI is in active development, to see currently available commands and options, use `space -h`.
