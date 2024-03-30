# Web Development Project 5 - *BiblioBlend*

Submitted by: **Kaleb Cole**

This web app: **Mixing authors, blending stories, shaping perspectives.**

Time spent: **9** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The list displays a list of data fetched using an API call**
- [X] **Data uses the useEffect React hook and async/await syntax**
- [X] **The app dashboard includes at least three summary statistics about the data such as**
  - [X] *Average Rating*
  - [X] *Earliest Publication Date*
  - [X] *Number of EBooks Available*
- [X] **A search bar allows the user to search for an item in the fetched data**
- [X] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**

The following **optional** features are implemented:

- [X] Multiple filters can be applied simultaneously
- [x] Filters use different input types such as a text input, a selection, or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/JEKaRmB.giff' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCAP
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.
* There were so many of the same books that my filters didn't work because there were multiple of the same books that had different ratings
* It took me forever to figure out how to wrangle the data from the API 
* I had to do Multiple chained API calls. In order to get Data that I would like. 
* A notable drawback of this service is that everything is done on the client side It would be better if I had some server side scripting. 
* The filters were especially difficult just because some entries have the data and some didn't, so I had to do a lot of validations using short circuiting. 
* The subject filter rarely works

## License

    Copyright [2024] [Kaleb Cole]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.