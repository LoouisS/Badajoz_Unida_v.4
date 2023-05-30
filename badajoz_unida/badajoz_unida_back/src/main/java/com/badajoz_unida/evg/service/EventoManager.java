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
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

}
