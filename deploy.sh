#ember build -prod && rsync -v --recursive --delete --delete-excluded dist/ yggdra@iserver.acao.it:/opt/acao-services/
ember build && rsync -v --recursive --delete --delete-excluded dist/ yggdra@iserver.acao.it:/opt/acao-services/

