package com.badajoz_unida.evg.service;


import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.InteresesEventos;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.repository.EventoRepository;
import com.badajoz_unida.evg.repository.InteresesEventosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
public class EventoManager implements EventoService{
    @Autowired
    EventoRepository eventoRepository;
    @Autowired
    InteresesEventosRepository ieRepository;

    @Override
    public Eventos save(NewEventDTO newEvent) throws CustomException, IOException {
        Eventos evento = new Eventos();
        evento.setTelefonoContacto(newEvent.getTelefonoContacto());
        evento.setFechaHora(newEvent.getFechaHora());
        evento.setNombre(newEvent.getNombre());
        evento.setLongitud(newEvent.getLongitud());
        evento.setLatitud(newEvent.getLatitud());
        evento.setDetalles(newEvent.getDetalles());
        evento.setDescripcion(newEvent.getDescripcion());
        evento.setLocalizacion(newEvent.getLocalizacion());
        Eventos eventoRegistrado = this.eventoRepository.save(evento);
        this.saveImg(eventoRegistrado,newEvent.getImagen());
        for (int x=0; x<newEvent.getIntereses().size(); x++){
            InteresesEventos ie= new InteresesEventos();
            ie.setEvento(eventoRegistrado);
            Intereses intereses = new Intereses();
            intereses.setInteresId(parseInt(newEvent.getIntereses().get(x)));
            ie.setInteres(intereses);
            this.ieRepository.save(ie);
        }
        return eventoRegistrado;
    }

    private void saveImg(Eventos eventoRegistrado, Optional<MultipartFile> imagen) throws IOException {
        String fileName = imagen.get().getOriginalFilename();
        String fileToSave = "../../assets/img/"+eventoRegistrado.getEventosId()+".png";
        File file = new File(fileToSave);
        file.getParentFile().mkdirs();
        file.delete();
        Path folder = Paths.get(fileToSave);
        Path fileToSavePath = Files.createFile(folder);
        InputStream inputStream = imagen.get().getInputStream();
        Files.copy(inputStream,fileToSavePath, StandardCopyOption.REPLACE_EXISTING);
    }
}
