
module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ro"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ro",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    domains: [
      {
        domain: "example.com",
        defaultLocale: "en-US"
      },
      {
        domain: "example.nl",
        defaultLocale: "nl-NL"
      },
      {
        domain: "example.fr",
        defaultLocale: "fr"
      }
    ]
  }
};
