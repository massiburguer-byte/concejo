/**
 * CÓDIGO DE GOOGLE APPS SCRIPT PARA ATENCIÓN VECINAL - CONCEJO MANEIRO
 * 
 * INSTRUCCIONES RÁPIDAS (2 MINUTOS):
 * 1. Ve a Google Drive (https://drive.google.com) y crea una nueva "Hoja de cálculo de Google" (Google Sheet).
 * 2. Nómbrala por ejemplo: "Solicitudes Atención Vecinal - Concejo Maneiro".
 * 3. En la primera fila (Fila 1), coloca estos encabezados en cada columna:
 *    - Columna A: Fecha y Hora
 *    - Columna B: Nombre Completo
 *    - Columna C: Teléfono de Contacto
 *    - Columna D: Sector / Comunidad
 *    - Columna E: Tipo de Solicitud
 *    - Columna F: Mensaje / Propuesta
 *    - Columna G: Estado
 * 
 * 4. En el menú superior de la hoja, haz clic en:
 *    Extensiones -> Apps Script
 * 
 * 5. Borra lo que aparezca y pega TODO el código que está abajo.
 * 6. Haz clic en el botón azul "Implementar" (arriba a la derecha) -> "Nueva implementación".
 * 7. En el engranaje tipo Seleccionar tipo: elige "Aplicación web".
 * 8. Configura:
 *    - Descripción: "Webhook Concejo Maneiro"
 *    - Ejecutar como: "Yo" (tu cuenta)
 *    - Quién tiene acceso: "Cualquier usuario" (Anyone) -> ¡MUY IMPORTANTE para que la web pueda enviar!
 * 9. Haz clic en "Implementar", autoriza los permisos de tu cuenta, y COPIA la "URL de la aplicación web" (termina en /exec).
 * 10. ¡Pásame esa URL y la conecto a la página web!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Agrega la nueva fila con los datos enviados desde la web
    sheet.appendRow([
      data.fecha || new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" }),
      data.nombre || "",
      data.telefono || "",
      data.sector || "",
      data.tipo || "",
      data.mensaje || "",
      "Pendiente de Revisión"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Solicitud registrada correctamente"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
