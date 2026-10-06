import { Button, Form, InputGroup } from 'react-bootstrap'

const categories = ['Todos', 'Frontend', 'Diseño', 'Backend']

export default function CourseFilters({ query, onQueryChange, category, onCategoryChange }) {
  return (
    <div className="filters-panel">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
        <div>
          <p className="eyebrow mb-1">EXPLORA A TU RITMO</p>
          <h2 className="section-title mb-0">Encuentra tu próximo curso</h2>
        </div>
        <InputGroup className="search-field">
          <InputGroup.Text aria-hidden="true">⌕</InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Buscar un curso..."
            aria-label="Buscar cursos"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </InputGroup>
      </div>
      <div className="category-list mt-4" role="group" aria-label="Filtrar por categoría">
        {categories.map((item) => (
          <Button
            key={item}
            variant={category === item ? 'primary' : 'light'}
            className="category-button"
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}
