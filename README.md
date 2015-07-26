[<img src="http://nixos.org/logo/nixos-hires.png" width="500px" alt="logo" />](https://nixos.org/nixos)

the main purpose of this repository is to scrape https://wiki.nixos.org (mediawiki) for offline distribution. 

currently this targets are there: 

# targets

## wiki.nixos.org
* html bundle
* qhelpgenerator wiki.qhp -o wiki.qch, see http://doc.qt.io/qt-5/qthelpproject.html

1. run this command:

    ```
    make wiki
    ```

2. then import it into assistant

    ```
    assistant -register wiki.qch
    ```

3. you can also use the html bundle, with:

    ```
    chromium wiki/Main_Page.html
    ```

you can import the documentation into assistant

## 'options search' 
* html bundle
* qhelpgenerator options-search.qch

1. run this command:

    ```
    make options-search
    ```

2. then import it into assistant

    ```
    assistant -register options-search.qch
    ```

3. you can also use the html bundle, with:

    ```
    chromium  options-search/options.html
    ```

