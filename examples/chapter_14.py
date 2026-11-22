# Independent teaching example; synthetic data.
import json
payload = json.loads('{"items":[{"city":"Taipei","count":12}],"next":null}')
assert isinstance(payload.get('items'), list)
for item in payload['items']:
    assert isinstance(item['count'], int)
    print(item['city'], item['count'])
