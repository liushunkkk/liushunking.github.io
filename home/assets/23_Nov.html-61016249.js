import{_ as a,o as e,c as i,a as d}from"./app-69b48761.js";const l={},r=d('<h1 id="_23-november" tabindex="-1"><a class="header-anchor" href="#_23-november" aria-hidden="true">#</a> 23_November</h1><h3 id="_2023年11月7日" tabindex="-1"><a class="header-anchor" href="#_2023年11月7日" aria-hidden="true">#</a> 2023年11月7日</h3><h4 id="to-do" tabindex="-1"><a class="header-anchor" href="#to-do" aria-hidden="true">#</a> To do</h4><ul><li>继续收集TSE的code context model数据集，以及expanded model数据集</li><li>了解CoCoAST的代码是如何读取java代码，存储java代码的，以及如何转换为AST</li><li>下午开组会 + 修改明天智能软件课的汇报</li><li>晚上搜索大数据课报告是否有网络资料</li></ul><h4 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> Summary</h4><ul><li>优化了数据收集的逻辑，添加了收集的属性，如文件地址等</li><li>开了组会，看了汇报ppt，抛弃CoCoAST，选择一个最经典的code embedding的方法对代码进行表征</li><li>搜索了大数据报告的博客，编写了一半的实验报告。这四十页报告太蠢了</li></ul><h3 id="_2023年11月8日" tabindex="-1"><a class="header-anchor" href="#_2023年11月8日" aria-hidden="true">#</a> 2023年11月8日</h3><h4 id="to-do-1" tabindex="-1"><a class="header-anchor" href="#to-do-1" aria-hidden="true">#</a> To do</h4><ul><li>继续完成大数据课报告</li><li>完成下午智能软件课汇报</li><li>完成两篇审稿意见提交，下午五点</li><li>计算机视觉第二次作业</li><li>收集数据</li></ul><h4 id="summary-1" tabindex="-1"><a class="header-anchor" href="#summary-1" aria-hidden="true">#</a> Summary</h4><ul><li>上午完成了大数据四十页报告，并提交</li><li>下午完成了课程汇报，交了两篇审稿意见</li><li>晚上完成了计算机视觉第二次作业，这作业也很傻逼</li><li>收集数据收集了一部分，太卡了，暂缓</li></ul><h3 id="_2023年11月9日" tabindex="-1"><a class="header-anchor" href="#_2023年11月9日" aria-hidden="true">#</a> 2023年11月9日</h3><h4 id="to-do-2" tabindex="-1"><a class="header-anchor" href="#to-do-2" aria-hidden="true">#</a> To do</h4><ul><li>继续收集数据，今天预计能完成mylyn项目的数据收集</li><li>寻找最经典的code embedding方法，初步使用它</li><li>如果可以，解决计算机视觉课的大作业</li></ul><h4 id="summary-2" tabindex="-1"><a class="header-anchor" href="#summary-2" aria-hidden="true">#</a> Summary</h4><ul><li>完成了mylyn数据集models的收集，但是前面的两千七百个没有加后面的哪些repo，估计影响不大，后面再看看要不要重新运行一次吧，太费时间了</li><li>找了code2vec，code2seq，玛德，这两个看不懂他的代码，好不容易运行起来了，看不懂他的输出，得不到想要的embedding，最后又找了astnn，它的代码还好理解一点，但是还只是初步看了一下，暂时确定他吧</li><li>计算机视觉大作业，done</li></ul><h3 id="_2023年11月10日" tabindex="-1"><a class="header-anchor" href="#_2023年11月10日" aria-hidden="true">#</a> 2023年11月10日</h3><h4 id="to-do-3" tabindex="-1"><a class="header-anchor" href="#to-do-3" aria-hidden="true">#</a> To do</h4><ul><li>继续看astnn代码</li><li>收集扩展mylyn的model数据集</li><li>好像没了，上最后一次计算机视觉课</li></ul><h4 id="summary-3" tabindex="-1"><a class="header-anchor" href="#summary-3" aria-hidden="true">#</a> Summary</h4><ul><li>气死我了，看了一天，修改了他的一些代码，能够针对一个输入输出一个词向量了，但是为啥每次输入生成的词向量不一样，看了一天没看出来个啥，崩溃，菜得想哭</li><li>收集了一半model扩展数据集</li><li>顺带让朋友抢了零食大礼包，为啥我每次都抢不到，买个衣服被客服高心态，也气的半死，做不了客服大可以不做，看不懂人话似的，最后退了 -_-</li></ul><h3 id="_2023年11月11日" tabindex="-1"><a class="header-anchor" href="#_2023年11月11日" aria-hidden="true">#</a> 2023年11月11日</h3><h4 id="to-do-4" tabindex="-1"><a class="header-anchor" href="#to-do-4" aria-hidden="true">#</a> To do</h4><ul><li>解决人工智能最后一个作业</li><li>继续收集完mylyn model扩展数据集</li><li>继续分析astnn针对相同输入输出不一样的原因</li><li>同步开展抽取java代码工作</li></ul><h4 id="summary-4" tabindex="-1"><a class="header-anchor" href="#summary-4" aria-hidden="true">#</a> Summary</h4><ul><li>人工智能最后一个作业 done</li><li>找到了astnn输出不一致的原因，torch.nn.Embedding每次都会随机生成词向量，暂时先设置随机种子为固定值，让他每次生成一样的。暂定这个为code embedding解决方案</li><li>完成了Java代码抽取程序编写，抽取java代码工作中，发现static block没有做过滤，崩溃，需要重新运行扩展model部分。</li><li>此外，发现最后得到的model数目比之前少了挺多，看来前面那2700个只用了一个git仓库的也要重新跑，一整个大崩溃。</li></ul><h3 id="_2023年11月12日" tabindex="-1"><a class="header-anchor" href="#_2023年11月12日" aria-hidden="true">#</a> 2023年11月12日</h3><h4 id="to-do-5" tabindex="-1"><a class="header-anchor" href="#to-do-5" aria-hidden="true">#</a> To do</h4><ul><li>重新收集前2700个model的数据</li><li>针对部分model，抽取3 step expanded model的java代码，三步就包含了一步和两步，不用重复extract</li><li>针对抽取的Java代码，尝试调用astnn，生成pkl文件和tsv文件保存起来，然后生成ast，word2vec模型和词向量，并将词向量保存到tsv文件中。</li></ul><h4 id="summary-5" tabindex="-1"><a class="header-anchor" href="#summary-5" aria-hidden="true">#</a> Summary</h4><ul><li>收集到了1000</li><li>extract有很多问题，比如不在一行，内部类等，一直在报错，打补丁，报错，打补丁，人都傻了。考虑使用字符串不好处理，后续换成使用ast语法分析试试</li><li>写了初始的保存pkl和tsv文件逻辑，但是由于extract工作不理想，导致生成ast存在问题。寄寄国王。</li><li>和室友出去吃了披萨，贵但一般</li></ul><h3 id="_2023年11月13日" tabindex="-1"><a class="header-anchor" href="#_2023年11月13日" aria-hidden="true">#</a> 2023年11月13日</h3><h4 id="to-do-6" tabindex="-1"><a class="header-anchor" href="#to-do-6" aria-hidden="true">#</a> To do</h4><ul><li>继续收集数据</li><li>尝试使用语法分析extract代码，保存到相应文件</li><li>如果可以，新的审稿论文看一点吧</li></ul><h4 id="summary-6" tabindex="-1"><a class="header-anchor" href="#summary-6" aria-hidden="true">#</a> Summary</h4><ul><li>收集数据，审稿论文——————寄寄寄寄寄寄，没弄</li><li>python处理Java 代码不行啊，搞了半天用不了，转而使用java去解析，最终完成了目标，针对上面的问题都能解决，暂时没出现问题对于myly5840来说</li><li>晚饭还没吃成，为了fix bug，寄寄国王，饿死了</li></ul><h3 id="_2023年11月14日" tabindex="-1"><a class="header-anchor" href="#_2023年11月14日" aria-hidden="true">#</a> 2023年11月14日</h3><h4 id="to-do-7" tabindex="-1"><a class="header-anchor" href="#to-do-7" aria-hidden="true">#</a> To do</h4><ul><li>继续收集数据</li><li>将ast树转换为sequence报错了，原本astnn论文中就只针对方法进行编码，现在把类和字段也输进去似乎行不通，看能不能找到解决方案</li><li>下午需要开组会</li></ul><h4 id="summary-7" tabindex="-1"><a class="header-anchor" href="#summary-7" aria-hidden="true">#</a> Summary</h4><ul><li>又收集了一部分，还有一点点，预计明天能完成</li><li>解决了这些问题，但是生成的对不对就不确定了</li><li>开了组会，<strong>两个问题</strong>：embedding有效性验证（使用JStereoCode辅助）和GNN Link Prediction打通</li><li>晚上心血来潮，自己电脑天天跑实在是受不了，去实验室服务器上折腾了一番，安装了python，pip等，然后安装项目依赖的一直报错<code>_ctype</code>找不到，疯了，网上都是说要apt安装相关依赖，但是我没得权限啊，崩溃</li></ul><h3 id="_2023年11月15日" tabindex="-1"><a class="header-anchor" href="#_2023年11月15日" aria-hidden="true">#</a> 2023年11月15日</h3><h4 id="to-do-8" tabindex="-1"><a class="header-anchor" href="#to-do-8" aria-hidden="true">#</a> To do</h4><p>收集完最后一部分的mylyn model数据，后续就可以进行全面的expand，以及java code extract，ast，embedding等，看能不能把这些放到服务器跑</p><p>继续折腾服务器</p><p>折腾好服务器后，将数据文件传上去，看能不能跑起来</p><p>继续写代码，需要考虑gnn了</p>',47),h=[r];function o(n,t){return e(),i("div",null,h)}const c=a(l,[["render",o],["__file","23_Nov.html.vue"]]);export{c as default};
