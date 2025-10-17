import Header from './components/Header'

export default function Account() {
    return (
    <>
      <Header isAnonymous={true}/>
      <h1>About</h1>
      <p>
        Public Bookmarks is a repository for the best content on the internet inspired by the <a href="https://thehistoryoftheweb.com/postscript/the-history-of-the-webs-monthly-blogroll-august-2018/">blog rolls</a> of days past. Here you will find no infinite scroll, no ads, and (hopefully) no AI slop. Instead, you'll find curated links to high-quality content from real people. 
      </p>
      <p>
        I invite you to add links to whatever type of high-quality web content interests you. Odds are, if you find it valuable, someone else will too.
      </p>
      <h2>More about the app</h2>
      <p>
        Public Bookmarks is an <a href="https://github.com/tdurtschi/public-bookmarks">open source</a> project created by <a href="https://lakewingrasoftware.azureedge.net/">Lake Wingra Software</a>.
      </p>
      <p>
        Have feedback? Send us an email at <a href="mailto:lakewingrasoftware@gmail.com">lakewingrasoftware@gmail.com</a>
      </p>
    </>
  );
}