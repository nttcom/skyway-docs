#プラットフォーム間のデータ通信対応表  
下記に、プラットフォーム間のデータ通信の可否と送受信時の型判断に関する情報を示します。  
現在、データ通信を行うと下記の場合に不具合があります。
* **Serializationを `binary` / `binary-utf8` に設定し、AndroidからJS版SkyWayに向けてバイナリデータを送信する場合**
* **Serializationを `none` に設定し、バイナリデータを通信する場合**

詳細は下記の通りです。

---


## serialization：`binary`、`binary-utf8`
|受発信|文字列|数値|配列|連想配列|バイナリ|
|:---:|:---:|:---:|:---:|:---:|:---:|
|iOS ⇄ iOS|○|○|○|○|○|
|iOS ⇄ Android|○|○|○|○|○|
|iOS ⇄ JS|○|○|○|○|○|
|Android ⇄ Android|○|○|○|○|○|
|Android ⇄ JS|○|○|○|○|× <sup>*1</sup>|
|JS ⇄ JS|○|○|○|○|○|

```
*1. Android → JS では正常に通信が行えません。  
```

## serialization : `json`
|受発信|配列<sup>*1</sup>|連想配列<sup>*2</sup>|
|:---:|:---:|:---:|
|iOS ⇄ iOS|○<sup>*3</sup>|○<sup>*3</sup>|
|iOS ⇄ Android|○<sup>*3,4</sup>|○<sup>*3,5</sup>|
|iOS ⇄ JS|○|○|
|Android ⇄ Android|○<sup>*4</sup>|○<sup>*5</sup>|
|Android ⇄ JS|○<sup>*4</sup>|○<sup>*5</sup>|
|JS ⇄ JS|○|○|

```
*1. Androidでの送信時、Arrayに加えJSONArrayでも同様に送信できます。
*2. Androidでの送信時、Mapに加えJSONObjectでも同様に送信できます。
*3. iOSではNSStringとして受信します。 
*4. AndroidではJSONArrayとして受信します。 
*5. AndroidではJSONObjectとして受信します。
```

## serialization : `none`

|受発信|文字列|数値|バイナリ|
|:---:|:---:|:---:|:---:|
|iOS ⇄ iOS|○|○|×<sup>*1</sup>|
|iOS ⇄ Android|○|○|×<sup>*1</sup>|
|iOS ⇄ JS|○|○|×<sup>*1</sup>|
|Android ⇄ JS|○|○|×<sup>*1</sup>|
|JS ⇄ JS|○|○|○|

```
*1. 正常に通信が行えません。
```

---


####[参考]プログラム言語毎のデータ型対応表

|表上の表記|文字列|数値|配列|連想配列|バイナリ|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Android|String|Short Integer Long Float Double|Array|Map|byte[] ByteBuffer|
|iOS|NSString|NSNumber|NSArray|NSDictionary|NSData|
|JS|string|number|array|object|ArrayBuffer|
