AssetCollector bookmarklet is made to download assets from any webpage.

TODO :

* deploy static files on github project pages
* do a Makefile to automatize the task
* currently it requires a proxy to change the reply header Content-Disposition
  * is there a way to change that ? data: url ?
  * it would allow to get pure static website. better ttl for the project

Status: 

* 1 click on firefox
* 2 clicks on chrome
  * make it smoother.
  * maybe with more API as it is an extension ?
  * maybe do a zip in a data: url

Ideas:

* make a generator of bookmarklet
  * all in browser
  * with jQuerify or not
* instead of having a proxy server and a download inclient, what about a download server ?
  * a running server will receive assets urls, download them in a specific folder
  * this option provide a lot more imformation to the downloader.
  * assume the server is running on the local box
  * it would remove all the automatice download in browser issue
* put the proxy on google application engine and thus remove the server need ?
  * would be nice... but i dunno how to do it in gae :)
  