package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UserEventDTO;
import com.badajoz_unida.evg.entity.*;
import com.badajoz_unida.evg.dto.EventFilter;
import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.InteresesEventos;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.exception.ErrorCode;
import com.badajoz_unida.evg.repository.EventoRepository;
import com.badajoz_unida.evg.repository.InteresesEventosRepository;
import com.badajoz_unida.evg.repository.UsuarioEventosRepository;
import com.badajoz_unida.evg.utils.EventosSpecification;
import com.badajoz_unida.evg.utils.JavaUtils;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.commons.lang3.StringUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.poi.ss.usermodel.Color;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xwpf.usermodel.*;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.xml.transform.*;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import static java.lang.Integer.parseInt;
import static java.nio.file.Paths.get;

@Service
public class EventoManager implements EventoService{
    @Autowired
    EventoRepository eventoRepository;
    @Autowired
    InteresesEventosRepository ieRepository;

    @Autowired
    UsuarioEventosRepository usuarioEventosRepository;

    @Autowired
    JwtManager jwtManager;

    JavaUtils javaUtils = new JavaUtils();

    Configuration freemarkerConfig = new Configuration();

    @Autowired
    ServletContext servletContext;

    @Override
    public Eventos save(NewEventDTO newEvent) throws CustomException, IOException {
        if (this.eventoRepository.existsEventosByNombre(newEvent.getNombre())){
            throw new CustomException(ErrorCode.ERROR_EQUALS_NAME);
        }

        Eventos evento = new Eventos();
        boolean sw= false;
        if (newEvent.getEventosId() != null){
            this.javaUtils.validateModificarEventos(newEvent);
            evento = this.eventoRepository.findByEventosId(newEvent.getEventosId());
            if (newEvent.getImagen() != null){
                sw=true;
            }
        }else {
            this.javaUtils.validateCrearEventos(newEvent);
        }
        evento.setTelefonoContacto(newEvent.getTelefonoContacto());
        evento.setFechaHora(newEvent.getFechaHora());
        evento.setNombre(newEvent.getNombre());
        evento.setLongitud(newEvent.getLongitud());
        evento.setLatitud(newEvent.getLatitud());
        evento.setDetalles(newEvent.getDetalles());
        evento.setDescripcion(newEvent.getDescripcion());
        evento.setLocalizacion(newEvent.getLocalizacion());
        Eventos eventoRegistrado = this.eventoRepository.save(evento);
        if (newEvent.getEventosId() == null || sw == true){
            if (newEvent.getImagen() != null) {
                this.javaUtils.validarImgPortada(newEvent.getImagen());
                this.saveImg(eventoRegistrado, newEvent.getImagen());
            }
        }
        if (ieRepository.findAllByEventoEventosId(eventoRegistrado.getEventosId()).size() > 0){
            ieRepository.deleteAllByEventoEventosId(eventoRegistrado.getEventosId());
        }
        for (int x=0; x<newEvent.getIntereses().size(); x++){
            InteresesEventos ie= new InteresesEventos();
            ie.setEvento(eventoRegistrado);
            Intereses intereses = new Intereses();
            intereses.setInteresId(newEvent.getIntereses().get(x));
            ie.setInteres(intereses);
            this.ieRepository.save(ie);
        }
        return eventoRegistrado;
    }

    private void saveImg(Eventos eventoRegistrado, Optional<MultipartFile> imagen) throws IOException {

        String extension = "";
        String nombreGuardar = "";
        String fileName = imagen.get().getOriginalFilename();
        int dotIndex = fileName.lastIndexOf('.');
        nombreGuardar = fileName.substring(0, dotIndex);
        if (imagen.get().getContentType().equals("image/png")) {
            extension = ".png";
        } else if (imagen.get().getContentType().equals("image/jpeg")) {
            extension = ".jpeg";
        } else if (imagen.get().getContentType().equals("image/jpg")) {
            extension = ".jpg";
        } else {
            throw new IllegalArgumentException("Formato de imagen no válido");
        }
        if (eventoRegistrado.getImg() != null && !eventoRegistrado.getImg().isEmpty()) {
            String fileToDelete = "../../assets/img/" + eventoRegistrado.getEventosId() + extension;
            File existingFile = new File(fileToDelete);
            existingFile.delete();
        }
        eventoRegistrado.setImg(nombreGuardar+extension);
        this.eventoRepository.save(eventoRegistrado);
        String fileToSave = "../../assets/img/"+eventoRegistrado.getEventosId()+extension;
        File file = new File(fileToSave);
        file.getParentFile().mkdirs();
        file.delete();
        Path folder = Paths.get(fileToSave);
        Path fileToSavePath = Files.createFile(folder);
        InputStream inputStream = imagen.get().getInputStream();
        Files.copy(inputStream,fileToSavePath, StandardCopyOption.REPLACE_EXISTING);
    }

    @Override
    public List<Eventos> getAll() throws CustomException {
        return this.eventoRepository.findAll();
    }
    public List<Eventos> getAllFilter(EventFilter evento) {
        List<Intereses> intereses = new ArrayList<>();
        for (String interesId : evento.getIntereses()) {
            if (interesId != null) {
                Intereses interes = new Intereses();
                interes.setInteresId(Integer.parseInt(interesId));
                intereses.add(interes);
            }
        }

        Specification<Eventos> specification = EventosSpecification.withFilters(
                evento.getNombre(),
                evento.getFechaInit(),
                evento.getFechaEnd(),
                evento.getLocalizacion(),
                intereses
        );

        return eventoRepository.findAll(specification);
    }


    @Override
    public UsuariosEventos registerUser(HttpServletRequest request, UserEventDTO inscripcion) throws CustomException {
        UsuariosEventos usuariosEventos = new UsuariosEventos();
        usuariosEventos.setUsuario(new Usuarios(this.jwtManager.getIdFromToken(request)));
        usuariosEventos.setEvento(new Eventos(inscripcion.getEventoId()));
        System.out.println(this.jwtManager.getIdFromToken(request));
        System.out.println(inscripcion.getEventoId());
        return this.usuarioEventosRepository.save(usuariosEventos);
    }

    @Override
    public Eventos getEventoById(Integer id) throws CustomException {
        return this.eventoRepository.findByEventosId(id);
    }

    @Override
    public List<Eventos> getNewReleases() throws CustomException {
        return this.eventoRepository.findNewReleases();
    }

    @Override
    public List<Eventos> getEventsByUserId(HttpServletRequest request) throws CustomException, IOException {
        return this.eventoRepository.findByUsuarioId(this.jwtManager.getIdFromToken(request));
    }

    @Override
    public Boolean checkUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException {
        if(this.usuarioEventosRepository.checkByUsuarioIdAndEventoId(this.jwtManager.getIdFromToken(request), eventoId) > 0){
            return true;
        }
        return false;
    }

    @Override
    public void removeUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException {
        usuarioEventosRepository.removeUserRegister(this.jwtManager.getIdFromToken(request), eventoId);
    }
    @Override
    public Eventos deleteEvent(int id) throws CustomException, IOException {
        Eventos evento = this.eventoRepository.findByEventosId(id);
        Hibernate.initialize(evento.getIntereses());
        Hibernate.initialize(evento.getUsuarios());
        if (evento.getImg() != null) {
            try {
                String extension = javaUtils.getExtension(evento.getImg());
                String filePath = "../../assets/img/" + evento.getEventosId() + "." + extension;
                File archivo = new File(filePath);
                if (archivo.exists()) {
                    archivo.delete();
                }
            } catch (Exception e) {
                // Manejar cualquier exc
                // epción que pueda ocurrir durante la eliminación del archivo
            }
        }

        this.eventoRepository.delete(evento);
        return evento;
    }

    @Override
    public ResponseEntity<?> generateExcell(int idEvento) throws CustomException, IOException, SQLException {
        Eventos evento = this.eventoRepository.findByEventosId(idEvento);
        try{
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Evento" + evento.getNombre());
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setColor(IndexedColors.WHITE.getIndex());
            titleFont.setFontHeight((short) 250);
            titleFont.setBold(true);
            titleStyle.setFont(titleFont);
            titleStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
            titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            sheet.setColumnWidth(1,10000);
            sheet.setColumnWidth(2,10000);
            sheet.setColumnWidth(3,10000);
            sheet.setColumnWidth(4,10000);
            sheet.setColumnWidth(5,6000);
            sheet.setColumnWidth(5,6000);
            sheet.setDefaultRowHeight((short) 400);


            CellStyle oddRowStyle = workbook.createCellStyle();
            oddRowStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
            oddRowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle evenRowStyle = workbook.createCellStyle();
            evenRowStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            evenRowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            //CREACIÓM DE LA TABLA DE EVENTOS (INFO DEL EVENTO EN EL EXCELL)
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Id");
            headerRow.createCell(1).setCellValue("Nombre del evento");
            headerRow.createCell(2).setCellValue("Descripción");
            headerRow.createCell(3).setCellValue("Detalles");
            headerRow.createCell(4).setCellValue("Localización");
            headerRow.createCell(5).setCellValue("Fecha y hora");
            headerRow.createCell(6).setCellValue("Teléfono de contacto");
            for (Cell cell : headerRow) {
                cell.setCellStyle(titleStyle);
            }
            //Introducción de datos en la tabla del evento
            Row dataRow = sheet.createRow(1);
            dataRow.createCell(0).setCellValue(evento.getEventosId());
            dataRow.createCell(1).setCellValue(evento.getNombre());
            dataRow.createCell(2).setCellValue(evento.getDescripcion());
            dataRow.createCell(3).setCellValue(evento.getDetalles());
            dataRow.createCell(4).setCellValue(evento.getLocalizacion());
            dataRow.createCell(5).setCellValue(evento.getFechaHora().toString());
            dataRow.createCell(6).setCellValue(evento.getTelefonoContacto());

            // Creación de la tabla de usuarios inscritos
            Row usersHeaderRow = sheet.createRow(3);
            usersHeaderRow.createCell(0).setCellValue("Id");
            usersHeaderRow.createCell(1).setCellValue("Apellidos");
            usersHeaderRow.createCell(2).setCellValue("Nombre");
            usersHeaderRow.createCell(3).setCellValue("Nick");
            usersHeaderRow.createCell(4).setCellValue("Correo electrónico");
            usersHeaderRow.createCell(5).setCellValue("Fecha de nacimiento");
            usersHeaderRow.createCell(6).setCellValue("Teléfono");
            for (Cell cell : usersHeaderRow) {
                cell.setCellStyle(titleStyle);
            }
            // Crear las filas de datos para la tabla de usuarios
            int rowNum = 4;
            for (Usuarios usuario : evento.getUsuarios()) {
                Row userDataRow = sheet.createRow(rowNum++);
                userDataRow.createCell(0).setCellValue(usuario.getUserId());
                userDataRow.createCell(1).setCellValue(usuario.getApellidos());
                userDataRow.createCell(2).setCellValue(usuario.getNombre());
                userDataRow.createCell(3).setCellValue(usuario.getNombreUsuario());
                userDataRow.createCell(4).setCellValue(usuario.getEmail());
                userDataRow.createCell(5).setCellValue(usuario.getFchNacimiento().toString());
                userDataRow.createCell(6).setCellValue(usuario.getTlf());
                if (rowNum % 2 != 0) {
                    for (Cell cell : userDataRow) {
                        cell.setCellStyle(oddRowStyle);
                    }
                } else { // Aplicar estilo a filas pares
                    for (Cell cell : userDataRow) {
                        cell.setCellStyle(evenRowStyle);
                    }
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            ByteArrayInputStream excelStream = new ByteArrayInputStream(outputStream.toByteArray());

            InputStreamResource inputStreamResource = new InputStreamResource(excelStream);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                    .contentLength(outputStream.size())
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+evento.getEventosId()+evento.getNombre()+".xlsx")
                    .body(inputStreamResource);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;

    }

    public ResponseEntity<?> generatePdf(int idEvento) throws CustomException, IOException, SQLException, TemplateException {
       /* try (InputStream templateStream = new ClassPathResource("templates/plantilla.docx").getInputStream();
             XWPFDocument document = new XWPFDocument(templateStream);
             PDDocument pdfDocument = new PDDocument()) {
            // Obtener datos del evento y usuarios registrados
            Eventos evento = this.eventoRepository.findByEventosId(idEvento);

            // Rellenar los campos en la plantilla DOCX
            replacePlaceholder(document, "event.name", evento.getNombre());
            replacePlaceholder(document, "event.descripcion", evento.getLocalizacion());
            fillUserTable(document, evento.getUsuarios());

            // Convertir la plantilla DOCX a PDF
            convertDocxToPdf(document, pdfDocument);

            // Crear un flujo de salida para el PDF generado
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            pdfDocument.save(outputStream);
            pdfDocument.close();

            // Configurar el encabezado de la respuesta HTTP
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "event.pdf");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            // Manejar cualquier excepción y devolver una respuesta de error adecuada
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
        return null;
    }

   /* private void replacePlaceholder(XWPFDocument document, String placeholder, String replacement) {
        for (XWPFParagraph paragraph : document.getParagraphs()) {
            List<XWPFRun> runs = paragraph.getRuns();
            StringBuilder paragraphText = new StringBuilder();

            for (XWPFRun run : runs) {
                String text = run.getText(0);
                if (text != null) {
                    paragraphText.append(text);
                }
            }

            String updatedText = paragraphText.toString().replace(placeholder, replacement);

            // Limpiar los runs existentes en el párrafo
            for (int i = runs.size() - 1; i >= 0; i--) {
                paragraph.removeRun(i);
            }

            // Agregar un nuevo run con el texto actualizado al párrafo
            XWPFRun newRun = paragraph.createRun();
            newRun.setText(updatedText);
        }
    }

    private void fillUserTable(XWPFDocument document, List<Usuarios> users) {
        XWPFTable table = document.getTables().get(0);

        for (int i = 0; i < users.size(); i++) {
            Usuarios user = users.get(i);
            XWPFTableRow row = table.createRow();
            row.getCell(0).setText(String.valueOf(user.getUserId()));  // Número de usuario
            row.getCell(1).setText(user.getApellidos());
            row.getCell(2).setText(user.getNombre());
            row.getCell(3).setText(user.getEmail());
            row.getCell(4).setText(user.getNombreUsuario());
            row.getCell(5).setText(user.getTlf());
            row.getCell(6).setText(String.valueOf(user.getFchNacimiento()));
        }
    }


    private void convertDocxToPdf(XWPFDocument docxDocument, PDDocument pdfDocument) throws IOException {
        try (ByteArrayOutputStream docxOutputStream = new ByteArrayOutputStream();
             ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream()) {

            docxDocument.write(docxOutputStream);
            docxOutputStream.close();

            try (InputStream docxInputStream = new ByteArrayInputStream(docxOutputStream.toByteArray())) {
                // Cargar el documento DOCX
                XWPFDocument document = new XWPFDocument(docxInputStream);

                // Crear un PDFRenderer para convertir el documento DOCX a imágenes
                PDFRenderer pdfRenderer = new PDFRenderer(pdfDocument);

                // Recorrer las páginas del documento DOCX y convertirlas a imágenes
                List<XWPFParagraph> paragraphs = document.getParagraphs();
                for (int i = 0; i < paragraphs.size(); i++) {
                    XWPFParagraph paragraph = paragraphs.get(i);

                    // Convertir el párrafo a una imagen
                    BufferedImage image = paragraphToImage(paragraph);

                    // Agregar la imagen a una página del PDF
                    PDPage page = new PDPage(new PDRectangle(image.getWidth(), image.getHeight()));
                    pdfDocument.addPage(page);
                    try (PDPageContentStream contentStream = new PDPageContentStream(pdfDocument, page)) {
                        PDImageXObject ximage = LosslessFactory.createFromImage(pdfDocument, image);

                        contentStream.drawImage(ximage, 0, 0, ximage.getWidth(), ximage.getHeight());
                    }
                }
            }
        }
    }

    private BufferedImage paragraphToImage(XWPFParagraph paragraph) {
        /*int width = 600; // Ancho de la imagen (ajusta según tus necesidades)
        int height = 800; // Altura de la imagen (ajusta según tus necesidades)

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();

        // Establecer el fondo blanco
        g.setColor(new Color(255, 255, 255));
        g.fillRect(0, 0, width, height);

        // Establecer la fuente y el tamaño del texto
        g.setFont(new Font("Arial", Font.PLAIN, 12));
        g.setColor(Color.BLACK);

        // Obtener el texto del párrafo
        String text = paragraph.getText();

        // Dividir el texto en líneas
        String[] lines = text.split("\\r?\\n");

        // Renderizar cada línea de texto en la imagen
        int lineHeight = g.getFontMetrics().getHeight();
        int y = 20; // Posición inicial en Y

        for (String line : lines) {
            g.drawString(line, 20, y);
            y += lineHeight;
        }

        g.dispose();

        return image;
    }*/
}
