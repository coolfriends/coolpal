# Help Plugin
Gathers help messages from plugins and prints a useful message

## Usage
Get help on how to use help
```
!help help
```

Get help on the feature-request plugin
```
!help feature-request
```

## To enable on plugin
Add a help getter to your plugin like so:
```js
class MockPlugin extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'mock';
    this.supported_event_types = ['message'];
  }

  get help() {
    return "A help message\n";
  }
}
```

Example using the feature request plugin
```js
let pal = CoolPal({
  token: 'your-token',
  plugins: [
    {
      name: 'help'
    },
    {
      name: 'feature-request'
    }
  ]
})
pal.start()
```

In Discord, type `!help feature-request` to see the help for feature-request




