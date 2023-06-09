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
import freemarker.template.TemplateException;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
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

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Override
    public Eventos save(NewEventDTO newEvent) throws CustomException, IOException {
        if (this.eventoRepository.existsEventosByNombre(newEvent.getNombre())){
            throw new CustomException(ErrorCode.ERROR_EQUALS_NAME);
        }

        Eventos evento = new Eventos();
        boolean sw= false;
        if (newEvent.getEventosId() != null){
            evento = this.eventoRepository.findByEventosId(newEvent.getEventosId());
            if (newEvent.getImagen() != null){
                sw=true;
            }
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
        if (newEvent.getEventosId() != null || sw == true){
            if (newEvent.getImagen() != null)
            this.saveImg(eventoRegistrado,newEvent.getImagen());
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

        List<Eventos> eventos = eventoRepository.findAll(specification);
        return eventos;
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
            XSSFCellStyle titleStyle = (XSSFCellStyle)workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setColor(IndexedColors.WHITE.getIndex());
            titleFont.setFontHeight((short) 250);
            titleFont.setBold(true);
            titleStyle.setFont(titleFont);
            byte[] rgb = {120, 100, (byte) 200};
            titleStyle.setFillForegroundColor((new XSSFColor(new java.awt.Color(209, 0, 0))));
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

    @Override
    public ResponseEntity<?> generatePdf(int idEvento) throws CustomException, IOException, SQLException, TemplateException {
        return null;
    }
}
