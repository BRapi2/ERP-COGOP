import React, { useState } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Filters = ({ isLoading, currentPageSize, handleSearch, handlePageSizeChange, searchPlaceholder }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchValue);
    };

    const clearSearch = () => {
        setSearchValue('');
        handleSearch('');
    };

    return (
        <Form onSubmit={handleSearchSubmit} className="mb-3">
            <Row className={`controlsRow gy-2 align-items-center`}>
                <Col md={8} lg={9}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={searchPlaceholder || "Buscar..."}
                            disabled={isLoading}
                        />
                        {searchValue && (
                            <Button variant="outline-secondary" onClick={clearSearch} disabled={isLoading}>
                                <FaTimes />
                            </Button>
                        )}
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            <FaSearch />
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={4} lg={3}>
                    <Form.Group as={Row} className="align-items-center justify-content-end">
                        <Form.Label column xs="auto" className="pe-2">Mostrar:</Form.Label>
                        <Col xs="auto">
                            <Form.Select
                                value={currentPageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                disabled={isLoading}
                                size="sm"
                            >
                                {[10, 25, 50, 100].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default Filters;