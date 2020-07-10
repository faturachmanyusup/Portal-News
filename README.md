# Portal-News
Group Project P2W1

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

RESTful endpoints:
POST /news/search
Find all news based on search parameters

- Request Header:

   {
      "access_token": "<your access token>"
   }

- Request Body:

   {
      "keywords": "<keywords to get insert into>",
      "languages": "<language to get insert into>"
   }

- Response (200 - OK):

{
    "status": "ok",
    "totalResults": 2205,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "ESPN"
            },
            "author": "Heather Dinich, Mark Schlabach",
            "title": "Source: Big Ten will be conference-only this fall",
            "description": "Big Ten athletic directors and presidents have chosen to move to a conference-only model for all fall sports, including football, a source told ESPN.",
            "url": "https://www.espn.com/college-football/story/_/id/29435295/source-big-ten-moving-conference-only-model-all-sports-fall",
            "urlToImage": "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2015%2F0827%2Fncf_u_bigtenlogo_ms_2_r4456_1296x729_16%2D9.jpg",
            "publishedAt": "2020-07-09T19:23:45Z",
            "content": "The Big Ten decided on Thursday that a conference-only season for all fall sports, including football, is the most likely outcome, a source with knowledge of the discussions told ESPN.\r\nIf college fo… [+1688 chars]"
        },
        {
            "source": {
                "id": "engadget",
                "name": "Engadget"
            },
            "author": "Christine Fisher",
            "title": "UEFA Champions League soccer moves to CBS All Access next month",
            "description": "Fans of European football will soon be able to stream matches in the US through CBS All Access and CBS Sports. Beginning in August, the two platforms will be the exclusive English-language home of the UEFA Champions League, UEFA Europa League and UEFA Europa …",
            "url": "https://www.engadget.com/cbs-all-access-uefa-champions-league-football-152021183.html",
            "urlToImage": "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-images%2F2020-07%2F6b0cfbb0-c1f6-11ea-87bf-b257dfcf323e&client=amp-blogside-v2&signature=ade60c54af9c869716cf7ef8a257bd0df199b37c",
            "publishedAt": "2020-07-09T15:20:21Z",
            "content": "Turner’s B/R Live pass costs $9.99 per month. CBS All Access starts at $5.99 per month with commercials, so if fans are willing to sit through ads, they may even be able to save a bit of money. Witho… [+439 chars]"
        },
    ]
}

- Response (400 - Bad Request):

{
    "name": "NewsAPIError: parametersMissing",
    "message": "Required parameters are missing, the scope of your search is too broad. Please set any of the following required parameters and try again: q, qInTitle, sources, domains."
}


RESTful endpoints:
GET /news/:country
Get Top Headline News based on Country choosen in request params

- Request Header:

   {
      "access_token": "<your access token>"
   }

- Request Body:

   not needed

- Request Params:

    "country"
   
- Response (200 - OK):

[
    {
        "source": {
            "id": null,
            "name": "Grid.id"
        },
        "author": null,
        "title": "Daftar Smartphone Jadul Samsung yang Tak Lagi Dapat Update Keamanan - Info Komputer",
        "description": "Samsung menghentikan update keamanan untuk dua produk jadulnya Galaxy S7 Active dan tablet Galaxy Tab A 10.1.",
        "url": "https://infokomputer.grid.id/read/122236501/daftar-smartphone-jadul-samsung-yang-tak-lagi-dapat-update-keamanan",
        "urlToImage": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2018/09/07/2174139916.jpg",
        "publishedAt": "2020-07-10T06:30:00Z",
        "content": "Samsung menghentikan update keamanan untuk dua produk jadulnya Galaxy S7 Active dan tablet Galaxy Tab A 10.1.\r\nBaik Galaxy S7 Active maupun Galaxy Tab A 10.1, keduanya meluncur pada 2016. Artinya, pe… [+857 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Grid.id"
        },
        "author": null,
        "title": "Berapa Banyak Manusia yang Dibutuhkan Agar Bisa Bertahan Hidup di Mars? - National Geographic - National Geographic",
        "description": "Dalam realita, perlu berapa banyak orang agar bisa bertahan hidup di Mars? Menurut model matematika terbaru, jumlah minimalnya 110 individu.",
        "url": "https://nationalgeographic.grid.id/read/132236926/berapa-banyak-manusia-yang-dibutuhkan-agar-bisa-bertahan-hidup-di-mars",
        "urlToImage": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2018/11/05/1166852476.jpg",
        "publishedAt": "2020-07-10T06:30:00Z",
        "content": "Nationalgeographic.co.id – Dalam realita, perlu berapa banyak orang agar bisa bertahan hidup di Mars? Menurut model matematika terbaru, jumlah minimalnya 110 individu.\r\nDilansir dari IFL Science, Jea… [+2522 chars]"
    }
]