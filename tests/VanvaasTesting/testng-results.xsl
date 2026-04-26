<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
<html>
<body>

<h2>TestNG XSLT Report - Vanvaas</h2>

<table border="1">
<tr bgcolor="#CCCCCC">
  <th>Test Method</th>
  <th>Status</th>
  <th>Duration (ms)</th>
</tr>

<xsl:for-each select="testng-results/suite/test/class/test-method">
<tr>
  <xsl:choose>
    <xsl:when test="@status='FAIL'">
      <xsl:attribute name="bgcolor">#FFBBBB</xsl:attribute>
    </xsl:when>
    <xsl:when test="@status='PASS'">
      <xsl:attribute name="bgcolor">#BBFFBB</xsl:attribute>
    </xsl:when>
    <xsl:otherwise>
      <xsl:attribute name="bgcolor">#FFFFBB</xsl:attribute>
    </xsl:otherwise>
  </xsl:choose>
  <td><xsl:value-of select="@name"/></td>
  <td><xsl:value-of select="@status"/></td>
  <td><xsl:value-of select="@duration-ms"/></td>
</tr>
</xsl:for-each>

</table>

<br/>
<b>Total: <xsl:value-of select="testng-results/@total"/></b><br/>
<b>Passed: <xsl:value-of select="testng-results/@passed"/></b><br/>
<b>Failed: <xsl:value-of select="testng-results/@failed"/></b><br/>
<b>Skipped: <xsl:value-of select="testng-results/@skipped"/></b>

</body>
</html>
</xsl:template>

</xsl:stylesheet>