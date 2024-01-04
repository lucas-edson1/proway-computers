import { Component } from '@angular/core';
import { ProdutosService } from '../../produtos.service';
import { IProduto, IProdutoCarrinho } from '../../produtos';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from '../../notificacao.service';
import { CarrinhoService } from '../../carrinho.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css'
})
export class DetalhesProdutoComponent {
  produto: IProduto | undefined;
  quantidade = 1;
  
  constructor (
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacao: NotificacaoService,
    private carrinho: CarrinhoService
  ){}

  ngOnInit():void {
    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"));    
    this.produto = this.produtosService.getOne(produtoId);    
  }

  adicionarAoCarrinho(){
    this.notificacao.notificar("Produto adicionado ao carrinho.");
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade
    }

    this.carrinho.adicionarAoCarrinho(produto);
  }

}
