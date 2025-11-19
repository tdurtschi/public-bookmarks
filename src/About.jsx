import Header from "./components/Header";

export default function Account() {
  return (
    <>
      <Header isAnonymous={true} />
      <h1>About</h1>
      <p>
        Public Bookmarks is an open repository for the best content on the internet. Here you will find curated links to high-quality web content.
      </p>
      <p>
        A free user account is required to add bookmarks. Please be mindful of the fact all users may view your bookmarks.
      </p>
      <h2>About the app</h2>
      <p>
        Public Bookmarks is an{" "}
        <a href="https://github.com/tdurtschi/public-bookmarks">open source</a>{" "}
        project created by{" "}
        <a href="https://lakewingrasoftware.azureedge.net/">
          Lake Wingra Software
        </a>
        .
      </p>
      <p>
        Have feedback? Send us an email at{" "}
        <a href="mailto:lakewingrasoftware@gmail.com">
          lakewingrasoftware@gmail.com
        </a>
      </p>
    </>
  );
}
