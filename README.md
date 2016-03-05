# tilestrata-bing
[![NPM version](http://img.shields.io/npm/v/tilestrata-bing.svg?style=flat)](https://www.npmjs.org/package/tilestrata-bing)
[![Build Status](https://travis-ci.org/naturalatlas/tilestrata-bing.svg)](https://travis-ci.org/naturalatlas/tilestrata-bing)
[![Coverage Status](http://img.shields.io/codecov/c/github/naturalatlas/tilestrata-bing/master.svg?style=flat)](https://codecov.io/github/naturalatlas/tilestrata-bing)

A [TileStrata](https://github.com/naturalatlas/tilestrata) plugin that acts as a [Bing Maps](https://www.bingmapsportal.com/) tile source. This is especially useful for satellite base layers you can stack an overlay on before sending to the client. Unlike [Mapbox Satellite](https://www.mapbox.com/satellite/), Bing Satellite is legal to proxy according to its [terms and conditions](https://www.microsoft.com/maps/product/terms.html) – just don't store/cache the result (§8.2.B).

### Sample Usage

```js
var tilestrata = require('tilestrata');
var bing = require('tilestrata-bing');
var strata = tilestrata();

strata.layer('satellite').route('t.png').use(bing({
	imagery: 'Aerial',
	key: '[license key goes here]'
}));

strata.listen(8080);
```

## Contributing

Before submitting pull requests, please update the [tests](test) and make sure they all pass.

```sh
$ npm test
```

## License

Copyright &copy; 2016 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/tilestrata-bing/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
