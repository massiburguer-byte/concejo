$Excel = New-Object -ComObject Excel.Application
$Excel.Visible = $false
$Excel.DisplayAlerts = $false
$wb = $Excel.Workbooks.Open("E:\argenis\Kimi_Agent_Mejorar sitio web\ORDENANZAS.xlsx")
$wb.SaveAs("E:\argenis\Kimi_Agent_Mejorar sitio web\ORDENANZAS.csv", 6)
$wb.Close($false)
$Excel.Quit()
