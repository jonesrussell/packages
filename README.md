[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/jonesrussell/packages">
    <img src="https://blog.jonesrussell42.xyz/assets/img/smile.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">packages</h3>

  <p align="center">
    <a href="https://github.com/jonesrussell/packages/issues">Report Bug</a>
    ·
    <a href="https://github.com/jonesrussell/packages/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## What is this?

A simple utility to print a projects dependencies in the package.json file.

### Built With

- [Typescript](https://www.typescriptlang.org/)
- [Commander](https://www.npmjs.com/package/commander)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Install NPM package

```sh
npm install -g @jonesrussell/packages
```

## Usage

```sh
$ packages

           dependencies            
┌───────────────────────┬─────────┐
│                  Name │ Version │
├───────────────────────┼─────────┤
│             commander │  ^6.2.0 │
│ console-table-printer │ ^2.4.33 │
│        global-modules │  ^2.0.0 │
│            jsonschema │  ^1.4.0 │
└───────────────────────┴─────────┘
                 dependencies                  
┌──────────────────────────────────┬──────────┐
│                             Name │  Version │
├──────────────────────────────────┼──────────┤
│                 @types/commander │  ^2.12.2 │
│            @types/global-modules │   ^2.0.0 │
│                      @types/jest │ ^26.0.15 │
│                      @types/node │ ^14.14.6 │
│        @types/source-map-support │   ^0.5.3 │
│ @typescript-eslint/eslint-plugin │   ^4.6.0 │
│        @typescript-eslint/parser │   ^4.6.0 │
│                           eslint │  ^7.12.1 │
│           eslint-config-prettier │  ^6.15.0 │
│    eslint-plugin-eslint-comments │   ^3.2.0 │
│             eslint-plugin-import │  ^2.22.1 │
│               eslint-plugin-jest │  ^24.1.0 │
│               eslint-plugin-node │  ^11.1.0 │
│                             jest │  ^26.6.1 │
│                         onchange │   ^7.1.0 │
│                            serve │  ^11.3.2 │
│               source-map-support │  ^0.5.19 │
│                          ts-jest │  ^26.4.3 │
│                       typescript │   ^4.0.5 │
└──────────────────────────────────┴──────────┘

```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Russell Jones - [@jonesrussell42](https://twitter.com/@jonesrussell42) - jonesrussell42@gmail.com

[https://github.com/jonesrussell/packages](https://github.com/jonesrussell/packages)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jonesrussell/packages.svg?style=flat-square
[contributors-url]: https://github.com/jonesrussell/pgk-info/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jonesrussell/packages.svg?style=flat-square
[forks-url]: https://github.com/jonesrussell/pgk-info/network/members
[stars-shield]: https://img.shields.io/github/stars/jonesrussell/packages.svg?style=flat-square
[stars-url]: https://github.com/jonesrussell/pgk-info/stargazers
[issues-shield]: https://img.shields.io/github/issues/jonesrussell/packages.svg?style=flat-square
[issues-url]: https://github.com/jonesrussell/pgk-info/issues
[license-shield]: https://img.shields.io/github/license/jonesrussell/packages.svg?style=flat-square
[license-url]: https://github.com/jonesrussell/pgk-info/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jonesrussell42
[product-screenshot]: images/screenshot.png
