<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <head>
                <title>Lab01_PawełKułach_12K2_GL03</title>
                <link rel="stylesheet" href="./B3_BD_L1_Kułach_Paweł.css" type="text/css" />
                <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
                <script type="text/javascript" src="./script.js"></script>
                <script type="text/javascript" src="./B3_BD_L1_KUłach_Paweł.js"></script>
            </head>
            <body>
                <div id="bodyContainer">
                    <div id="topPanel">
                        <div id="siteLogoWrapper">
                            <img src="./assets/B3_BD_L1_Kułach_Paweł_img1.png" id="siteLogo" alt="Logo Site"></img>
                        </div>
                        <div id="siteTitleWrapper">
                            <p id="siteTitle"> STOCKingly! </p>
                        </div>
                        <div id="siteLoginInfo">

                        </div>
                    </div>
                    <div id="middlePanel">
                        <div id="leftSidePanel">
                            <div id="leftSideMenu">
                                <p id="leftSideMenuTitle"> Featured Stocks </p>
                                <div id="leftSideListWrapper">
                                    <xsl:for-each select="featured_stocks/stock">
                                    <xsl:sort select="name"/>
                                    <xsl:if test="shares &gt; 0">
                                        <a href="#item_{@id}">
                                            <div class="leftMenuOptionWrapper">
                                                <p class="leftMenuOptionName">
                                                    <xsl:value-of select="name"/>
                                                </p>

                                                <p class="leftMenuOptionShort">
                                                    <xsl:value-of select="short"/>
                                                </p>
                                            </div>
                                        </a>
                                    </xsl:if>
                                    </xsl:for-each>
                                </div>
                            </div>
                        </div>
                        <div id="graphContainer">
                            <xsl:for-each select="featured_stocks/stock">
                            <xsl:sort select="name"/>
                                <xsl:if test="shares &gt; 0">
                                    <div class="stockWrapper" id="item_{@id}">
                                        <script type="text/javascript">
                                         var id = <xsl:value-of select="@id"/>
                                         Items[id - 1] = new Stock();
                                         Items[id - 1].startSimulation(id);
                                    </script>
                                    <div class="stockData">
                                        <div class="stockHeaderTop">
                                            <div class="stockNameWrapper">
                                                <p class="stockName">
                                                    <xsl:value-of select="name"/>
                                                </p>
                                            </div>
                                            <div class="stockLogoWrapper">
                                                <img class="stockLogo">
                                                    <xsl:attribute name="src">
                                                        <xsl:value-of select="logo/@src"/>
                                                    </xsl:attribute>
                                                    <xsl:attribute name="alt">
                                                        <xsl:value-of select="logo/@alt"/>
                                                    </xsl:attribute>
                                                </img>
                                            </div>
                                        </div>
                                        <div class="stockHeaderBottom">
                                            <div class="stockShortWrapper">
                                                <p class="stockShort">
                                                    <xsl:value-of select="exchange"/>
: 
                                                    <xsl:value-of select="short"/>
                                                </p>
                                            </div>
                                            <div class="stockValueWrapper">
                                                <p class="stockValue"></p>
                                            </div>
                                            <div class="stockCurrencyWrapper">
                                                <p class="stockCurrency">
                                                    <xsl:value-of select="currency"/>
                                                </p>
                                            </div>
                                            <div class="stockStonksWrapper">
                                                <p class="stockStonks">0 (0%)</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="stockGraphPanel">
                                        <div class="stockYAxis">
                                            <p class="pYAxis">130</p>
                                            <p class="pYAxis">125</p>
                                            <p class="pYAxis">120</p>
                                            <p class="pYAxis">115</p>
                                            <p class="pYAxis">110</p>
                                        </div>
                                        <div class="stockGraphWrapper">
                                            <canvas class="stockGraph" height="190" width="714">

                                            </canvas>

                                            <div class="stockXAxis">
                                                <p class="pXAxis">5:00 PM</p>
                                                <p class="pXAxis">6:00 PM</p>
                                                <p class="pXAxis">7:00 PM</p>
                                                <p class="pXAxis">8:00 PM</p>
                                                <p class="pXAxis">9:00 PM</p>
                                                <p class="pXAxis">10:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="stockBottomPanel">
                                        <div class="stockBottomPanelFill">
                                        </div>
                                        <div class="stockBonusDataWrapper">
                                            <div class="stockBonusDataColumn">

                                                <div class="stockBonusLabelsWrapper">
                                                    <p class="stockBonusLabels">Opening </p>
                                                    <p class="stockBonusLabels">Previous Close</p>
                                                </div>
                                                <div class="stockBonusValuesWrapper">
                                                    <p class="stockBonusData">126 </p>
                                                    <p class="stockBonusData">119</p>
                                                </div>
                                            </div>
                                            <div class="stockBonusDataColumn">
                                                <div class="stockBonusLabelsWrapper">
                                                    <p class="stockBonusLabels">Max </p>
                                                    <p class="stockBonusLabels">Min</p>
                                                </div>
                                                <div class="stockBonusValuesWrapper">
                                                    <p class="stockBonusData">142</p>
                                                    <p class="stockBonusData">99</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="stockBottomPanelFill">
                                        </div>
                                    </div>
                                </div>
                            </xsl:if>
                        </xsl:for-each>
                    </div>
                    <div id="rightSidePanel">
                    </div>
                </div>
                <div id="bottomPanel">
                    <div id="footer">
                        <p></p>
                    </div>
                </div>
            </div>
        </body>
    </html>
</xsl:template>

</xsl:stylesheet>
