DROP VIEW IF EXISTS note_Extend_View;

CREATE VIEW note_Extend_View AS
(SELECT note_id AS "Note Id", title AS "Title",note AS "Note",
first_name || ' ' || last_name AS "Author"
FROM note_tbl
JOIN user_tbl USING (user_id)
)