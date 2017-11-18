<template>
    <div>
        <div id="content">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
        </div>
        <div class="spacer"></div>
        <div id="content2">
            <div class="one">1</div>
            <div class="two">2</div>
            <div class="three">3</div>
            <div class="four">4</div>
            <div class="five">5</div>
            <div class="six">6</div>
        </div>
        <div class="spacer"></div>
        <div class="zone-grid">

        </div>
    </div>
</template>

<style>
    body{
        color: #fff;
        font-family: Nunito Semibold,serif;
        text-align: center;
    }
    #content{
        display: grid;
        /*grid-template-columns: 33.3% 33.3% 33.3%;*/
        /*grid-template-columns: 33% 20% 50%;*/
        /*grid-template-columns: 1fr 1fr 1fr;*/
        /*grid-template-columns: 1fr 2fr 1fr;*/
        grid-template-columns: repeat(3, 1fr);

        /*grid-template-rows: 200px 100px 50px;*/
        /*grid-template-rows: repeat(3, 200px);*/
        grid-template-rows: repeat(3, minmax(100px, auto));

        /*grid-auto-rows: 200px;*/
        /*grid-auto-rows: minmax(300px, auto);*/

        grid-gap: 10px;
        /*grid-row-gap: 12px;*/
        /*grid-column-gap: 15px;*/

        max-width: 960px;
        margin: 0;
    }
    #content div{
        background: #3bbced;
        padding: 30px;
    }
    #content div:nth-child(even){
        background: #777;
    }

    .spacer{
        margin: 100px;
    }
    .one{
        /*grid-column-start: 1;*/
        /*grid-column-end: 3;*/
        grid-column: 1/3;
    }
    .two{
        grid-column: 3/7;
    }
    .three{
        grid-column: 1/4;
        grid-row: 2/4;
    }
    .four{
        grid-column: 4/7;
        grid-row: 2/4;
    }
    .five{
        grid-column: 3/7;
    }
    .six{
        grid-row: 4;
        grid-column: 1/3;
    }
    #content2{
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, minmax(150px, auto));
        grid-gap: 10px;
        max-width: 960px;
        margin: 0;
    }
    #content2 div{
        background: #3bbced;
        padding: 30px;
    }
    #content2 div:nth-child(even){
        background: green;
    }
    /*
    align items: from grid parent {up/down}
    align-items: start
    align-items: end
    align-items: center
    align-items: stretch {default}

    justify items: from grid parent {left/right}
    justify-items: start
    justify-items: end
    justify-items: center
    justify-items: stretch {default}

    properties are also available on child elements by using:
    align-self and justify-self
     */
</style>