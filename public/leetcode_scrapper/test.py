from bs4 import BeautifulSoup
import json

soup = BeautifulSoup(open("problems.html"), "html.parser")

data = []
trs = soup.select("tr")
for i in range(len(trs)):
    tr = None
    if i == 0:
        tr = trs[i].select("th")
    else:
        tr = trs[i].select("td")
    if i != 0:
        data.append([tr[j].get_text() for j in range(len(tr))][1:-1])


json.dump(data, open("data.json", "w"))


# for tr in :
#     print(tr)
#     break