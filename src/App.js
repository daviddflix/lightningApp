/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'
import getMovies from './lib/Api'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset('images/background.png'),
      },
      Container: {
        rect: true,
        x: 0,
        y: 0,
        w: 1920,
        color: 0xff808080,
        flex: {
          direction: 'row',
          wrap: true,
          justifyContent: 'space-evenly'
        },
      },
    }
  }

  async addDataToScreen(url) {
    let data = await getMovies(url)
console.log('data', data)
  

    let movies = data.results.map(movie => {
      return {
        text: {
          text: movie.title,
          fontSize: 30,
          x: 0, y: 0
        },  
        Image: {mount: 0.5, x: 2, y:2,
          flexItem: {
          margin: 20
        }, w: 300, h: 300, src:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      }
    })

    let tempChildren = this.tag('Container').children
    this.tag('Container').patch({
      children: tempChildren.concat(movies)
    })
  }

  _handleDown() {
    this.tag('Container').patch({
      y: this.tag('Container').y - 20
    })
  }

  _handleUp() {
    this.tag('Container').patch({
      y: this.tag('Container').y + 20
    })
  }



  _init() {
    this.addDataToScreen('https://api.themoviedb.org/3/movie/upcoming?api_key=64125537d28938955c4b662dd7b7c523')
  }
}


