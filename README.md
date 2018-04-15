# alternate schedule parser tester
Tests your Gunn alternate schedule parser.

You'd think that your parser is UNDEFEATABLE, but suddenly Gunn releases a NEW alternate schedule with a NEW FORMAT that breaks your alternate schedule parser.

```
Period D (8:25-9:57)
Brunch (9:57-10:12)
FlexTime (10:12-10:50)
Period E (11:00-12:15)
Lunch (12:15-12:55)
Period A (12:55-2:15)
Period G (2:25-3:40)
```
Easy!

```
Period B Final (8:30-10:10)
Brunch (10:10-10:25)
Period D Final (10:30-12:10)
Break with NO LUNCH SERVED (12:10-12:40)
Zero & H Period Finals (12:45-2:25)
```
Still easy!

```
Period D (8:25-9:50)
Brunch (9:50-10:05)
Assembly for 9th/10th graders in Titan Gym (10:05-10:40)
11th/12th graders to FlexTime
Assembly for 11th/12th graders in Titan Gym (10:50-11:25)
9th/10th graders to FlexTime
Period E (11:35-12:55)
Lunch (12:55-1:35)
Period G (1:35-2:55)
```
Can just add an exception...

```html
<p>Period B (8:25-9:50)</p>
<p>Brunch (9:50-10:05)</p>
<p>Period C (10:05-11:25)</p>
<p>Period E (11:35-12:55)</p>
<p>Lunch (12:55-1:35)</p>
<p>Period F (1:35-2:55)</p>
<p>Staff Meeting (3:05-3:45)</p>
```
Where did those HTML tags come from? Just replace them with newlines...

```html
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Period E (8:25-9:50)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Brunch (9:50-10:05)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">FlexTime (10:05-10:35)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Period B (10:45-11:55)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">EXTENDED LUNCH for Int'l. Potluck (11:55-12:55)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Period A (12:55-2:05)
<div style="color: rgb(0, 0, 0); font-family: 'Courier New', monospace, 'Courier New', EmojiFont, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Period G (2:15-3:35)
```
?!?!

Although no parser is Gunn-proof, you can at least prepare for the ones that have already been pre-planned.
