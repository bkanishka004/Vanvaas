<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
<html>
<body>

<h2>TestNG XSLT Report</h2>

<table border="1">
<tr>
<th>Test Method</th>
<th>Status</th>
</tr>

<xsl:for-each select="testng-results/suite/test/class/test-method">
<tr>
<td><xsl:value-of select="@signature"/></td>
<td>PASSED</td>
</tr>
</xsl:for-each>

</table>

</body>
</html>
</xsl:template>

</xsl:stylesheet>