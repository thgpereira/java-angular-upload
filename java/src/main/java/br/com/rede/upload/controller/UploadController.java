package br.com.rede.upload.controller;

import br.com.rede.upload.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("upload")
@CrossOrigin(origins = "http://localhost:4200")
public class UploadController {

    @Autowired
    private UploadService service;

    @PostMapping("send")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            service.save(file);
            return ResponseEntity.status(HttpStatus.OK).body("Suuuuuceeeessuuuuuu!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }

    @ResponseBody
    @GetMapping("load/{filename}")
    public ResponseEntity<Resource> loadFile(@PathVariable String filename) {
        Resource file = service.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
