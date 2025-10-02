(OK) api/v1/researchers/ (GET) -> lista todos os pesquisadores 
(OK) api/v1/researchers?name="" (GET) -> retoma a lista de pesquisadores com o nome parecido
(OK) api/v1/researchers/:id (GET) -> retoma os dados de um pesquisador específico
(OK) api/v1/researchers/:id/companies (GET) -> retoma as empresas recomendadas para um certo pesquisador

(OK) api/v1/companies/ (GET) -> lista todos os pesquisadores
(OK) api/v1/companies/search?name="" (GET) -> retoma a lista de empresas com o nome parecido
(OK) api/v1/companies/:id/ (GET) -> retoma os dados de uma empresa específica
api/v1/companies/:id/researchers (GET) -> retoma uma lista de todos os pesquisadores recomendados para a empresa ordenados pela média dos critérios
api/v1/companies/:id/researchers?sort=flexibilidade (GET) -> retoma uma lista de todos os pesquisadores recomendados para a empresa ordenados por flexibilidade
api/v1/companies/:id/researchers?sort=areaEstudo (GET) -> retoma uma lista de todos os pesquisadores recomendados para a empresa ordenados pela área de estudo
api/v1/companies/:id/researchers?sort=experienciaAcademica (GET) -> retoma uma lista de todos os pesquisadores recomendados para a empresa ordenados pelas experiências acadêmicas
