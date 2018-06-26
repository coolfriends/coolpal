# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `npm start` will now fall back on the `COOLPAL_DISCORD_TOKEN` environment
  variable. This will occur if there is no token key in the configuration, or if
  the token key is empty.
- Created a color function in `lib/utils.js` that can make Discord text appear
  in a code block as green or yellow.
- Added a CHANGELOG.md file

### Changed

- Update README to reflect new build process. The build artifacts are
  `dist/bin.bundle.js` and `dist/lib.bundle.js`.

### Removed

[0.0.1]: https://github.com/coolfriends/coolfriends/compare/HEAD
