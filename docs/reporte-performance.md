# Reporte de Performance

## Tabla de Resultados

| Métrica | Seed chica | Seed grande |
|---|---:|---:|
| p95 (`http_req_duration`) | 83.11ms | 1m0s |
| Error rate (`http_req_failed`) | 0.00% | 90.90% |
| Iteraciones por segundo | 0.93866/s | 0.326056/s |

## Hipótesis

Una hipótesis razonable es que el tiempo de respuesta y la tasa de errores aumentan a medida que crece el volumen de datos, mientras que la cantidad de iteraciones por segundo disminuye.

Esto podría deberse a que las consultas a la base de datos o el procesamiento de información se vuelven más costosos cuando hay más registros. En particular, el p95 de la seed grande alcanza los 60 segundos y el 90,90 % de las solicitudes falla, lo que sugiere una degradación importante del rendimiento.