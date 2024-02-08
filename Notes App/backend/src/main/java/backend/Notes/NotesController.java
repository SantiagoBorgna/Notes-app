package backend.Notes;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
public class NotesController {

    NotesRepository notesRepo;

    public NotesController(NotesRepository notesRepo) {
        this.notesRepo = notesRepo;
    }
    
    @CrossOrigin("*")
    @GetMapping("/api/notes")
    public List<Notes> listNotes() {
        return notesRepo.findAll();
    }

    @CrossOrigin("*")
    @GetMapping("/api/note/{id}")
    public Optional<Notes> getNotes(@PathVariable Long id) {
        return notesRepo.findById(id);
    }

    @CrossOrigin("*")
    @PostMapping("/api/addnote")
    public void addNote(@RequestBody Notes note) {
        notesRepo.save(note);
    }

    @CrossOrigin("*")
    @PutMapping("/api/updatenote")
    public void updateNote(@RequestBody Notes note) {
        if (notesRepo.existsById(note.id)) {
            notesRepo.save(note);
        }
    }

    @CrossOrigin("*")
    @PutMapping("/api/archivenote")
    public void archiveNote(@RequestBody Notes note) {
        if (notesRepo.existsById(note.id)) {
            notesRepo.save(note);
        }
    }

    @CrossOrigin("*")
    @PutMapping("/api/unarchivenote")
    public void unarchiveNote(@RequestBody Notes note) {
        if (notesRepo.existsById(note.id)) {
            notesRepo.save(note);
        }
    }
    
    @CrossOrigin("*")
    @DeleteMapping("/api/deletenote/{id}")
    public void deleteNote(@PathVariable Long id) {
        notesRepo.deleteById(id);
    }
}
